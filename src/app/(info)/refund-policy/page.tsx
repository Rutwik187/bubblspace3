const Page = () => {
  return (
    <div>
      <div className="max-w-4xl container mx-auto px-4 py-8  mt-4">
        <h1 className="text-4xl font-bold mb-4">Cancellation/Refund Policy</h1>
        <h2 className="text-2xl font-bold mb-2">1. Cancellation Policy</h2>
        <p className="mb-4">
          You may cancel your subscription at any time by contacting our support
          team at{" "}
          <a
            href="mailto:contact@bubblspace.com"
            className="text-primary hover:underline"
          >
            contact@bubblspace.com
          </a>
          . Your cancellation will take effect at the end of the current billing
          period.
        </p>
        <h2 className="text-2xl font-bold mb-2">2. Refund Policy</h2>
        <p className="mb-4">
          Refunds are processed according to the following policy:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            No refunds will be issued for the current billing period. Your
            subscription will remain active until the end of the current billing
            period.
          </li>
          <li>Refunds will only be given for services not yet consumed.</li>
        </ul>
        <h2 className="text-2xl font-bold mb-2">3. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about our cancellation and
          refund policy, please contact us at{" "}
          <a
            href="mailto:contact@bubblspace.com"
            className="text-primary hover:underline"
          >
            contact@bubblspace.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Page;
