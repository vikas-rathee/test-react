import React, { useState, useRef, useEffect } from "react";

// Should we use <optgroup> for Group names ??

// Grouped sample data
const sampleOptions = [
  {
    label: "Fruits",
    options: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Mango", value: "mango" },
      { label: "Orange", value: "orange" },
      { label: "Grapes", value: "grapes" },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { label: "Carrot", value: "carrot" },
      { label: "Potato", value: "potato" },
      { label: "Tomato", value: "tomato" },
    ],
  },
];

// 🔹 MultiSelect (ONLY handles picking)
export function MultiSelect({ options = [], addedItems, onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [tempSelected, setTempSelected] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef(null);

  const filteredGrouped = options
    .map((group) => ({
      ...group,
      options: group.options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(search.toLowerCase()) &&
          !addedItems.some((a) => a.value === opt.value)
      ),
    }))
    .filter((group) => group.options.length > 0);

  const flatOptions = filteredGrouped.flatMap((g) => g.options);

  const toggleOption = (option) => {
    setTempSelected((prev) => {
      const exists = prev.find((o) => o.value === option.value);
      if (exists) return prev.filter((o) => o.value !== option.value);
      return [...prev, option];
    });
  };

  const handleAdd = () => {
    onAdd(tempSelected);
    setTempSelected([]);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen && e.key === "ArrowDown") {
      setIsOpen(true);
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) =>
          prev < flatOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : flatOptions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        const option = flatOptions[highlightedIndex];
        if (option) toggleOption(option);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-96 border rounded p-2"
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
          setHighlightedIndex(0);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="w-full outline-none"
      />

      {isOpen && (
        <div className="border mt-2 max-h-60 overflow-auto flex flex-col">
          <ul role="listbox" className="flex-1">
            {flatOptions.length === 0 && (
              <li className="p-2 text-gray-500">No results</li>
            )}

            {(() => {
              let currentIndex = -1;

              return filteredGrouped.map((group) => (
                <div key={group.label}>
                  <div className="px-2 py-1 text-xs font-bold text-gray-500 bg-gray-50 sticky top-0">
                    {group.label}
                  </div>

                  {group.options.map((option) => {
                    currentIndex++;

                    const isSelected = tempSelected.some(
                      (o) => o.value === option.value
                    );

                    const isHighlighted = currentIndex === highlightedIndex;

                    return (
                      <li
                        key={option.value}
                        onMouseEnter={() => setHighlightedIndex(currentIndex)}
                        onClick={() => toggleOption(option)}
                        className={`flex items-center gap-2 p-2 cursor-pointer ${
                          isHighlighted ? "bg-gray-200" : ""
                        }`}
                      >
                        <input type="checkbox" checked={isSelected} readOnly />
                        <span>{option.label}</span>
                      </li>
                    );
                  })}
                </div>
              ));
            })()}
          </ul>

          {tempSelected.length > 0 && (
            <div className="p-2 border-t sticky bottom-0 bg-white">
              <button
                onClick={handleAdd}
                className="w-full bg-blue-500 text-white py-1 rounded"
              >
                Add ({tempSelected.length})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 🔹 Separate Added List Component
function AddedList({ items, onRemove }) {
  return (
    <ul className="w-96 mt-3">
      {items.map((item) => (
        <li
          key={item.value}
          className="flex justify-between items-center px-2 py-1 border rounded mb-1"
        >
          {item.label}
          <button onClick={() => onRemove(item)}>×</button>
        </li>
      ))}
    </ul>
  );
}

// 🔹 Parent (source of truth)
export default function Demo() {
  const [addedItems, setAddedItems] = useState([]);

  const handleAdd = (newItems) => {
    setAddedItems((prev) => [...prev, ...newItems]);
  };

  const handleRemove = (item) => {
    setAddedItems((prev) => prev.filter((i) => i.value !== item.value));
  };

  return (
    <div className="p-10">
      <MultiSelect
        options={sampleOptions}
        addedItems={addedItems}
        onAdd={handleAdd}
      />

      <AddedList items={addedItems} onRemove={handleRemove} />
    </div>
  );
}
