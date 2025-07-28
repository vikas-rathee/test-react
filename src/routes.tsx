import CodeMirrorEditorTest from "./EditorIntegration/CodeMirrorEditor/CodeMirrorEditorTest";
import CodeMirrorWithJsonCParser from "./EditorIntegration/CodeMirrorEditor/CodeMirrorWithJsonCParser";
import CodeMirrorWithLinter from "./EditorIntegration/CodeMirrorEditor/CodeMirrorWithLinter";
import CodeMirrorMergeTest from "./EditorIntegration/CodeMirrorMerge/CodeMirrorMergeTest";
import EditorWithTable from "./EditorIntegration/EditorWithTable/EditorWithTable";
import JsonDiffKit from "./EditorIntegration/JsonDiffKit/JsonDiffKit";
import MonacoEditorTest from "./EditorIntegration/MonacoEditor/MonacoEditorTest";
import AsyncValidationAndSubmission from "./RHF/AsyncValidationAndSubmission/AsyncValidationAndSubmission";
import FoodDeliveryForm from "./RHF/FoodDeliveryForm";
import GetFieldStateParent from "./RHF/GetFieldStateSubscription/GetFieldStateParent";
import TestDefaultValueAfterReRender from "./RHF/TestDefaultValueAfterReRender";
import UseFormStateParent from "./RHF/TestFullFormStateWithUseFormState/UseFormStateParent";
import TestSubscription from "./RHF/TestSubscriptionWithFormState/TestSubscription";
import TestSubscriptionContainer from "./RHF/TestSubscriptionWithFormState/TestSubscriptionContainer";
import TestSubscriptionDestructuring from "./RHF/TestSubscriptionWithFormState/TestSubscriptionDestructuring";
import TypicalFoodDeliveryForm from "./RHF/TypicalFoodDeliveryForm";
import FoodDeliverFormWithReusableControls from "./RHF/WithReusableControls/pages/FoodDelivery/FoodDeliverFormWithReusableControls";
import ReRenderInputWithoutHooks from "./TestReRendering/ReRenderInputWithoutHooks";
import ReRenderInputWithUseRef from "./TestReRendering/ReRenderInputWithUseRef";
import ReRenderInputWithUseState from "./TestReRendering/ReRenderInputWithUseState";
import ReactDiffViewTest from "./EditorIntegration/ReactDiffView/ReactDiffViewTest";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "rr",
        children: [
          {
            path: "riu", // re-render input with useState
            element: <ReRenderInputWithUseState />,
          },
          {
            path: "rir", // re-render input with useRef
            element: <ReRenderInputWithUseRef />,
          },
          {
            path: "riw", // re-render input without hooks
            element: <ReRenderInputWithoutHooks />,
          },
        ],
      },
      {
        path: "rhf",
        children: [
          {
            path: "typical", // typical form with useState
            element: <TypicalFoodDeliveryForm />,
          },
          {
            path: "rhf", // form with useForm hook
            element: <FoodDeliveryForm />,
          },
          {
            path: "tdvr", // Test default value after re-render
            element: <TestDefaultValueAfterReRender />,
          },
          {
            path: "with-reusable-controls",
            element: <FoodDeliverFormWithReusableControls />,
          },
          {
            path: "trns", // Test re-rendering no subscription
            element: <TestSubscription />,
          },
          {
            path: "trws",
            element: <TestSubscriptionDestructuring />,
          },
          {
            path: "trsc",
            element: <TestSubscriptionContainer />,
          },
          {
            path: "async-validation-submission",
            element: <AsyncValidationAndSubmission />,
          },
          {
            path: "useFromState-child-has-whole-from-state",
            element: <UseFormStateParent />,
          },
          {
            path: "getFieldState-subscription",
            element: <GetFieldStateParent />,
          },
        ],
      },
      {
        path: "ide",
        children: [
          {
            path: "monaco",
            element: <MonacoEditorTest />,
          },
          {
            path: "code-mirror",
            element: <CodeMirrorEditorTest />,
          },
          {
            path: "code-mirror-linter",
            element: <CodeMirrorWithLinter />,
          },
          {
            path: "code-mirror-jsonc",
            element: <CodeMirrorWithJsonCParser />,
          },
          {
            path: "with-table",
            element: <EditorWithTable />,
          },
          {
            path: "code-mirror-merge",
            element: <CodeMirrorMergeTest />,
          },
          {
            path: "json-diff-kit",
            element: <JsonDiffKit />,
          },
          {
            path: "react-diff-view",
            element: <ReactDiffViewTest />,
          },
        ],
      },
    ],
  },
];

export default routes;
