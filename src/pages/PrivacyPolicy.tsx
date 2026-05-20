import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const PrivacyPolicy = () => {
  const directInformation = [
    "Basic contact details including your name, address, phone number, email.",
    "Order information including your name, billing address, shipping address, payment confirmation, email address, phone number.",
    "Account information including your username, password, security questions.",
    "Shopping information including the items you view, put in your cart or add to your wishlist.",
    "Customer support information including the information you choose to include in communications with us, for example, when sending a message through the Services.",
  ];

  const thirdPartySources = [
    "Companies who support our Site and Services, such as Shopify.",
    "Our payment processors, who collect payment information such as bank account, credit or debit card information, and billing address to process your payment in order to fulfill your orders and provide you with products or services you have requested, in order to perform our contract with you.",
    "When you visit our Site, open or click on emails we send you, or interact with our Services or advertisements, we, or third parties we work with, may automatically collect certain information using online tracking technologies such as pixels, web beacons, software developer kits, third-party libraries, and cookies.",
  ];

  const usageItems = [
    {
      title: "Providing Products and Services.",
      text: "We use your personal information to provide you with the Services in order to perform our contract with you, including to process your payments, fulfill your orders, send notifications to you related to your account, purchases, returns, or other transactions, create, maintain and otherwise manage your account, arrange for shipping, facilitate any returns and enable you to post reviews.",
    },
    {
      title: "Marketing and Advertising.",
      text: "We use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you advertisements for products or services. This may include using your personal information to better tailor the Services and advertising on our Site and other websites.",
    },
    {
      title: "Security and Fraud Prevention.",
      text: "We use your personal information to detect, investigate or take action regarding possible fraudulent, illegal or malicious activity. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password, or other access details with anyone else. If you believe your account has been compromised, please contact us immediately.",
    },
    {
      title: "Communicating with you.",
      text: "We use your personal information to provide you with customer support and improve our Services. This is in our legitimate interests in order to be responsive to you, to provide effective services to you, and to maintain our business relationship with you.",
    },
  ];

  const disclosureItems = [
    "With vendors or other third parties who perform services on our behalf, such as IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping.",
    "With business and marketing partners, including Shopify, to provide services and advertise to you. Our business and marketing partners will use your information in accordance with their own privacy notices.",
    "When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations, with your consent.",
    "With our affiliates or otherwise within our corporate group, in our legitimate interests to run a successful business.",
    "In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations, including to respond to subpoenas, search warrants and similar requests, to enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.",
  ];

  const categories = [
    "Identifiers such as basic contact details and certain order and account information",
    "Commercial information such as order information, shopping information and customer support information",
    "Internet or other similar network activity, such as Usage Data",
  ];

  const recipients = [
    "Vendors and third parties who perform services on our behalf, such as Internet service providers, payment processors, fulfillment partners, customer support partners and data analytics providers",
    "Business and marketing partners",
    "Affiliates",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="px-4 pb-20 pt-52 sm:pt-48">
        <div className="container mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Privacy Policy
          </p>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
            DreamGlobal Privacy Policy.
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: 19-May-2026
          </p>

          <div className="mt-10 space-y-8 text-muted-foreground">
            <section>
              <p className="leading-7">
                This Privacy Policy describes how DreamGlobal (the "Site", "we",
                "us", or "our") collects, uses, and discloses your personal
                information when you visit, use our services, or make a purchase
                from dreamglobal.in (the "Site") or otherwise communicate with us
                (collectively, the "Services"). For purposes of this Privacy
                Policy, "you" and "your" means you as the user of the Services,
                whether you are a customer, website visitor, or another
                individual whose information we have collected pursuant to this
                Privacy Policy.
              </p>
              <p className="mt-4 leading-7">
                Please read this Privacy Policy carefully. By using and accessing
                any of the Services, you agree to the collection, use, and
                disclosure of your information as described in this Privacy
                Policy. If you do not agree to this Privacy Policy, please do not
                use or access any of the Services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-heading text-2xl font-semibold text-foreground">
                Changes to This Privacy Policy
              </h2>
              <p className="leading-7">
                We may update this Privacy Policy from time to time, including to
                reflect changes to our practices or for other operational, legal,
                or regulatory reasons. We will post the revised Privacy Policy on
                the Site, update the "Last updated" date and take any other steps
                required by applicable law.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-heading text-2xl font-semibold text-foreground">
                How We Collect and Use Your Personal Information
              </h2>
              <p className="leading-7">
                To provide the Services, we collect and have collected over the
                past 12 months personal information about you from a variety of
                sources, as set out below. The information that we collect and
                use varies depending on how you interact with us. In addition to
                the specific uses set out below, we may use information we
                collect about you to communicate with you, provide the Services,
                comply with any applicable legal obligations, enforce any
                applicable terms of service, and to protect or defend the
                Services, our rights, and the rights of our users or others.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-heading text-2xl font-semibold text-foreground">
                What Personal Information We Collect
              </h2>
              <p className="leading-7">
                The types of personal information we obtain about you depends on
                how you interact with our Site and use our Services. When we use
                the term "personal information", we are referring to information
                that identifies, relates to, describes or can be associated with
                you. The following sections describe the categories and specific
                types of personal information we collect.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-heading text-2xl font-semibold text-foreground">
                Information We Collect Directly from You
              </h2>
              <p className="leading-7">
                Information that you directly submit to us through our Services
                may include:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
                {directInformation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 leading-7">
                Some features of the Services may require you to directly provide
                us with certain information about yourself. You may elect not to
                provide this information, but doing so may prevent you from using
                or accessing these features.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-heading text-2xl font-semibold text-foreground">
                Information We Collect through Cookies
              </h2>
              <p className="leading-7">
                We also automatically collect certain information about your
                interaction with the Services ("Usage Data"). To do this, we may
                use cookies, pixels and similar technologies ("Cookies"). Usage
                Data may include information about how you access and use our
                Site and your account, including device information, browser
                information, information about your network connection, your IP
                address and other information regarding your interaction with the
                Services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-heading text-2xl font-semibold text-foreground">
                Information We Obtain from Third Parties
              </h2>
              <p className="leading-7">
                Finally, we may obtain information about you from third parties,
                including from vendors and service providers who may collect
                information on our behalf, such as:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
                {thirdPartySources.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 leading-7">
                Any information we obtain from third parties will be treated in
                accordance with this Privacy Policy. We are not responsible or
                liable for the accuracy of the information provided to us by third
                parties and are not responsible for any third party's policies or
                practices. For more information, see the section below, Third
                Party Websites and Links.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-heading text-2xl font-semibold text-foreground">
                How We Use Your Personal Information
              </h2>
              <div className="space-y-4">
                {usageItems.map((item) => (
                  <p key={item.title} className="leading-7">
                    <span className="font-semibold text-foreground">
                      {item.title}
                    </span>{" "}
                    {item.text}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-3 font-heading text-2xl font-semibold text-foreground">
                Cookies
              </h2>
              <p className="leading-7">
                Like many websites, we use Cookies on our Site. We use Cookies
                to power and improve our Site and our Services (including to
                remember your actions and preferences), to run analytics and
                better understand user interaction with the Services (in our
                legitimate interests to administer, improve and optimize the
                Services). We may also permit third parties and services
                providers to use Cookies on our Site to better tailor the
                services, products and advertising on our Site and other websites.
                Most browsers automatically accept Cookies by default, but you
                can choose to set your browser to remove or reject Cookies
                through your browser controls. Please keep in mind that removing
                or blocking Cookies can negatively impact your user experience
                and may cause some of the Services, including certain features and
                general functionality, to work incorrectly or no longer be
                available. Additionally, blocking cookies may not completely
                prevent how we share information with third parties such as our
                advertising partners.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-heading text-2xl font-semibold text-foreground">
                How We Disclose Personal Information
              </h2>
              <p className="leading-7">
                In certain circumstances, we may disclose your personal
                information to third parties for legitimate purposes subject to
                this Privacy Policy. Such circumstances may include:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
                {disclosureItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 leading-7">
                We may disclose the following categories of personal information
                and sensitive personal information about users for the purposes
                set out above in "How we Collect and Use your Personal
                Information" and "How we Disclose Personal Information":
              </p>
              <div className="mt-4 grid gap-5 rounded-lg border border-border bg-card p-5 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    Category:
                  </h3>
                  <ul className="list-disc space-y-2 pl-6 leading-7">
                    {categories.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    Categories of Recipients:
                  </h3>
                  <ul className="list-disc space-y-2 pl-6 leading-7">
                    {recipients.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-4 leading-7">
                We do not use or disclose sensitive personal information for the
                purposes of inferring characteristics about you.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-heading text-2xl font-semibold text-foreground">
                User Generated Content
              </h2>
              <p className="leading-7">
                The Services may enable you to post product reviews and other
                user-generated content. If you choose to submit user generated
                content to any public area of the Services, this content will be
                public and accessible by anyone. We do not control who will have
                access to the information that you choose to make available to
                others, and cannot ensure that parties who have access to such
                information will respect your privacy or keep it secure. We are
                not responsible for the privacy or security of any information
                that you make publicly available, or for the accuracy, use or
                misuse of any information that you disclose or receive from third
                parties.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-heading text-2xl font-semibold text-foreground">
                Third Party Websites and Links
              </h2>
              <p className="leading-7">
                Our Site may provide links to websites or other online platforms
                operated by third parties. If you follow links to sites not
                affiliated or controlled by us, you should review their privacy
                and security policies and other terms and conditions. We do not
                guarantee and are not responsible for the privacy or security of
                such sites, including the accuracy, completeness, or reliability
                of information found on these sites. Information you provide on
                public or semipublic venues, including information you share on
                third-party social networking platforms may also be viewable by
                other users of the Services and/or users of those third-party
                platforms without limitation as to its use by us or by a third
                party. Our inclusion of such links does not, by itself, imply any
                endorsement of the content on such platforms or of their owners or
                operators, except as disclosed on the Services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-heading text-2xl font-semibold text-foreground">
                Children's Data
              </h2>
              <p className="leading-7">
                The Services are not intended to be used by children, and we do
                not knowingly collect any personal information about children. If
                you are the parent or guardian of a child who has provided us
                with their personal information, you may contact us using the
                contact details set out below to request that it be deleted.
              </p>
              <p className="mt-4 leading-7">
                As of the Effective Date of this Privacy Policy, we do not have
                actual knowledge that we "share" or "sell" (as those terms are
                defined in applicable law) personal information of individuals
                under 16 years of age.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-heading text-2xl font-semibold text-foreground">
                Security and Retention of Your Information
              </h2>
              <p className="leading-7">
                Please be aware that no security measures are perfect or
                impenetrable, and we cannot guarantee "perfect security." In
                addition, any information you send to us may not be secure while
                in transit. We recommend that you do NOT use unsecure channels to
                communicate sensitive or confidential information to us.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
