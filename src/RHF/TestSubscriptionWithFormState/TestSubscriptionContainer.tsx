import TestSubscription from "./TestSubscription";
import TestSubscriptionDestructuring from "./TestSubscriptionDestructuring";

const TestSubscriptionContainer = () => {
  return (
    <>
      <TestSubscription />
      <div className="mb-5"></div>
      <TestSubscriptionDestructuring />
    </>
  );
};

export default TestSubscriptionContainer;
