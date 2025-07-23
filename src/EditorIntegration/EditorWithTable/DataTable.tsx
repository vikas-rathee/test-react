import { DataTableStyled } from "./DataTableStyled";
import { useState, useEffect } from "react";
import { DataTable as PrimeReactTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "./ProductService";

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

const DataTable = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    ProductService.getProductsMini().then((data: Product[]) => setProducts(data));
  }, []);
  return (
    <DataTableStyled noBorderFirstColumn={true}>
      <PrimeReactTable value={products} scrollHeight="calc(100vh - 240px)" scrollable={true}>
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </PrimeReactTable>
    </DataTableStyled>
  );
};

export default DataTable;
