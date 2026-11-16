// Ruta: src/data/workbook.ts
// Client-facing questions of the Emerge "Client Discovery Workbook"
// (Comprehensive Master Edition). Sections 01-21 are reproduced in full;
// the advisor-only sections (22-23) and the post-engagement sections
// (24-26: onboarding, first 30 days, 90-day roadmap) are intentionally left
// out of the public site.
//
// This file must stay free of runtime imports: vite.config.ts loads it to
// generate the static Netlify form definition.
import type { IconName } from "../components/icons/names.ts";

export type FieldType =
  | "textarea"
  | "text"
  | "email"
  | "tel"
  | "url"
  | "choice"
  | "select"
  | "months";

export type Question = {
  id: string;
  label: string;
  hint?: string;
  type?: FieldType; // defaults to "textarea"
  options?: readonly string[];
  required?: boolean;
  autoComplete?: string;
  inputMode?: "numeric" | "text";
  half?: boolean; // half width from md up
};

export type Section = {
  id: string;
  /** Reference to the printed workbook, used in the submission. */
  ref: string;
  title: string;
  icon: IconName;
  intro: string;
  questions: readonly Question[];
};

export type Part = {
  id: string;
  title: string;
  summary: string;
  icon: IconName;
  sections: readonly Section[];
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const ACTIVITY_LEVELS = ["High", "Average", "Low"] as const;

const READINESS = ["Ready to share", "Partially available", "Not available"] as const;

export const PARTS: readonly Part[] = [
  {
    id: "company",
    title: "Your Company",
    summary: "Who you are, how the business works and how its year unfolds.",
    icon: "building",
    sections: [
      {
        id: "contact",
        ref: "01 Company & Contact Profile",
        title: "About You",
        icon: "idcard",
        intro:
          "Let's start with you. These details tell us who to address and how you prefer to be contacted. Your name, email and company are the only required fields in the entire workbook.",
        questions: [
          { id: "contactName", label: "Full name", type: "text", required: true, autoComplete: "name", half: true },
          { id: "contactTitle", label: "Title / role", type: "text", autoComplete: "organization-title", half: true },
          { id: "contactEmail", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
          { id: "contactPhone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
          {
            id: "contactMethod",
            label: "Preferred communication method",
            type: "choice",
            options: ["Email", "Phone call", "Video call", "Text message"],
          },
        ],
      },
      {
        id: "profile",
        ref: "01 Company & Contact Profile",
        title: "Company Profile",
        icon: "building",
        intro:
          "A quick snapshot of the organization: its name, footprint and the people who lead it. Short answers are perfect here.",
        questions: [
          { id: "companyName", label: "Legal company name", type: "text", required: true, autoComplete: "organization", half: true },
          { id: "tradeName", label: "DBA / trade name", type: "text", half: true },
          { id: "industry", label: "Industry", type: "text", half: true },
          { id: "yearFounded", label: "Year founded", type: "text", inputMode: "numeric", half: true },
          { id: "website", label: "Website", type: "url", autoComplete: "url", half: true },
          { id: "mainPhone", label: "Main phone", type: "tel", half: true },
          { id: "primaryEmail", label: "Primary company email", type: "email", half: true },
          { id: "socialProfiles", label: "Social media profiles", type: "text", half: true },
          {
            id: "locations",
            label: "Headquarters address, additional locations and geographic markets served",
          },
          { id: "decisionMakers", label: "Other key executives, owners and decision-makers" },
          {
            id: "employees",
            label: "Approximate number of employees",
            type: "choice",
            options: ["1–10", "11–50", "51–200", "201–500", "500+"],
          },
          { id: "departments", label: "Departments and operating locations" },
        ],
      },
      {
        id: "background",
        ref: "02 Company Background & Model",
        title: "Background & Business Model",
        icon: "layers",
        intro:
          "Your story and your economic engine. Knowing where the business comes from and how it makes money anchors everything we recommend later.",
        questions: [
          { id: "history", label: "Describe the company history and major milestones." },
          { id: "missionValues", label: "What is the mission, long-term vision and set of core values?" },
          { id: "businessModel", label: "Describe the business model and how the company makes money." },
          { id: "revenueStreams", label: "List the primary products, services and revenue streams." },
          { id: "bestOfferings", label: "Which offerings have the highest margins and greatest growth potential?" },
        ],
      },
      {
        id: "seasonality",
        ref: "02 Business Seasonality & Operating Cycles",
        title: "Seasonality & Operating Cycles",
        icon: "wave",
        intro:
          "Most businesses have a rhythm. Understanding yours helps us time marketing, staffing and investment to the moments that matter.",
        questions: [
          {
            id: "isSeasonal",
            label: "Is your business seasonal, or does it maintain relatively consistent activity throughout the year?",
            type: "choice",
            options: ["Strongly seasonal", "Somewhat seasonal", "Consistent year-round", "Not sure"],
          },
          { id: "fluctuations", label: "Describe typical fluctuations." },
          {
            id: "performancePatterns",
            label: "How does your business perform on a monthly, quarterly and annual basis? What patterns are predictable?",
          },
          { id: "peakSeason", label: "Which months or quarters are your peak season? What drives increased demand or sales?" },
          {
            id: "lowSeason",
            label: "Which months or quarters are your low season? How significant are the declines, and how do you respond?",
          },
          { id: "externalFactors", label: "Which holidays, events, industry cycles or external factors influence your business?" },
          {
            id: "seasonalStrategies",
            label: "What strategies have you used to boost slow-season sales or maximize peak-season opportunities?",
          },
          {
            id: "seasonalImpact",
            label: "How do seasonal fluctuations affect staffing, inventory, operating capacity, cash flow and marketing spending?",
          },
          {
            id: "fluctuationDrivers",
            label: "Are fluctuations mainly driven by customer demand, industry conditions, operational limitations or your existing marketing activities? Explain.",
          },
        ],
      },
      {
        id: "activity",
        ref: "02 12-Month Business Activity Assessment",
        title: "12-Month Activity Map",
        icon: "calendar",
        intro:
          "Mark each month as High, Average or Low. If something notable drives a month (a holiday, a contract cycle, a constraint), add a short note.",
        questions: [{ id: "activityMap", label: "Business activity by month", type: "months" }],
      },
    ],
  },
  {
    id: "direction",
    title: "Leadership & Direction",
    summary: "Who decides, how you compete and where you want to go.",
    icon: "compass",
    sections: [
      {
        id: "leadership",
        ref: "03 Leadership & Decisions",
        title: "Leadership & Decisions",
        icon: "orgchart",
        intro:
          "Good strategy fails without clear ownership. These answers help us design a plan that fits the way your organization actually decides.",
        questions: [
          { id: "finalDecisions", label: "Who makes final strategic, marketing and budget decisions?" },
          { id: "approvals", label: "Who approves recommendations, contracts and expenditures?" },
          { id: "implementationOwner", label: "Who will own implementation and day-to-day coordination?" },
          { id: "approvalTimeline", label: "What is the typical approval timeline for major initiatives?" },
          { id: "alignmentIssues", label: "What leadership priorities or internal alignment issues should we know about?" },
          { id: "reportingCadence", label: "What internal reporting and meeting cadence is preferred?" },
        ],
      },
      {
        id: "positioning",
        ref: "04 Positioning & Differentiation",
        title: "Positioning & Differentiation",
        icon: "target",
        intro: "How you see your place in the market, in your own words. There are no wrong answers here.",
        questions: [
          { id: "idealCustomers", label: "Who are your ideal customers and what problem do you solve for them?" },
          { id: "whyChooseYou", label: "Why do customers choose you over alternatives?" },
          { id: "usp", label: "What is your unique selling proposition or competitive advantage?" },
          { id: "brandPerception", label: "How do you believe your brand is currently perceived?" },
          { id: "strengthsWeaknesses", label: "What are the company's greatest strengths and weaknesses?" },
        ],
      },
      {
        id: "goals",
        ref: "05 Goals & Growth Targets",
        title: "Goals & Growth Targets",
        icon: "flag",
        intro: "Where you want the business to be. Clear goals let us measure every recommendation against what matters to you.",
        questions: [
          { id: "priorities90", label: "What are the top three priorities for the next 90 days?" },
          { id: "success12", label: "What outcomes would make the next 12 months a success?" },
          { id: "goals3y", label: "What are your three-year revenue, market and organizational goals?" },
          { id: "expansionPlans", label: "What new markets, locations, products or services are planned?" },
          { id: "customerGoals", label: "What customer acquisition, retention and awareness goals matter?" },
        ],
      },
    ],
  },
  {
    id: "performance",
    title: "Challenges & Finances",
    summary: "What stands in the way, and the numbers behind the business.",
    icon: "summit",
    sections: [
      {
        id: "challenges",
        ref: "06 Challenges & Growth Barriers",
        title: "Challenges & Growth Barriers",
        icon: "summit",
        intro: "Candor here saves time later. Everything you share is used only to prepare for our work together.",
        questions: [
          { id: "growthBlockers", label: "What is preventing the business from growing faster?" },
          { id: "urgentProblems", label: "Which current problems are most urgent or costly?" },
          { id: "constraints", label: "What operational, financial or staffing constraints exist?" },
          { id: "stalledInitiatives", label: "What initiatives have been attempted but not completed?" },
          { id: "risksIfUnchanged", label: "What are the biggest risks if nothing changes?" },
        ],
      },
      {
        id: "financial",
        ref: "07 Financial Performance",
        title: "Financial Performance",
        icon: "coin",
        intro:
          "Approximate figures are fine. Ranges are fine. If you would rather discuss numbers in person, simply say so.",
        questions: [
          {
            id: "revenueRange",
            label: "Annual revenue range",
            type: "select",
            options: [
              "Under $500K",
              "$500K – $1M",
              "$1M – $5M",
              "$5M – $10M",
              "$10M – $25M",
              "$25M – $100M",
              "Over $100M",
              "Prefer to discuss in person",
            ],
          },
          { id: "revenueTrend", label: "Revenue trend and historical growth (if available)" },
          { id: "revenueSources", label: "Primary revenue sources and approximate contribution by product / service" },
          { id: "margins", label: "Highest-margin and lowest-margin offerings; key cost drivers" },
          { id: "orderValue", label: "Average order / contract value, gross margin and recurring revenue" },
          { id: "growthCapital", label: "Growth capital available and financial constraints on investment" },
        ],
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    summary: "Budget, strategy, team and the channels you use today.",
    icon: "megaphone",
    sections: [
      {
        id: "budget",
        ref: "08 Marketing Budget & ROI",
        title: "Marketing Budget & ROI",
        icon: "pie",
        intro: "Where the marketing money goes and how you judge whether it works.",
        questions: [
          { id: "marketingSpend", label: "Annual and monthly marketing / advertising spend" },
          { id: "budgetByChannel", label: "Budget by channel, campaign and agency / vendor" },
          { id: "roiMeasurement", label: "How is marketing return on investment measured today?" },
          { id: "targetCac", label: "What is the target acquisition cost and acceptable payback period?" },
          { id: "budgetFlexibility", label: "What budget flexibility exists for new growth initiatives?" },
        ],
      },
      {
        id: "marketingStrategy",
        ref: "09 Marketing Strategy & Team",
        title: "Marketing Strategy & Team",
        icon: "megaphone",
        intro: "The thinking behind your marketing, the people who run it, and what you have learned along the way.",
        questions: [
          { id: "currentStrategy", label: "Describe the current marketing strategy and positioning." },
          { id: "marketingTeam", label: "Who manages marketing internally and which agencies / consultants are engaged?" },
          { id: "plannedActivities", label: "What marketing activities are planned over the next 12 months?" },
          { id: "bestCampaigns", label: "Which marketing campaigns have worked best, and why?" },
          { id: "underperformers", label: "Which have underperformed, and what was learned?" },
        ],
      },
      {
        id: "channels",
        ref: "10 Advertising Channels",
        title: "Advertising Channels",
        icon: "broadcast",
        intro: "A quick inventory of where you show up today. Mark N/A for any channel you don't use.",
        questions: [
          { id: "paidMedia", label: "Current paid search, display, video and social advertising" },
          { id: "seoLocal", label: "SEO, local search and Google Business Profile activity" },
          { id: "directChannels", label: "Email, SMS, direct mail and customer reactivation programs" },
          { id: "traditionalMedia", label: "Print collateral, outdoor advertising, transit, radio and other media" },
          { id: "eventsPr", label: "Events, trade shows, sponsorships, PR, promotional products and gifting" },
        ],
      },
    ],
  },
  {
    id: "customers",
    title: "Customers & Brand",
    summary: "Who buys, why they buy, what they are worth and how they see you.",
    icon: "people",
    sections: [
      {
        id: "segments",
        ref: "11 Customers & Segments",
        title: "Customers & Segments",
        icon: "people",
        intro: "Your customers, as you understand them today. Patterns you've noticed are just as useful as formal research.",
        questions: [
          { id: "segmentsProfiles", label: "Describe primary customer segments and ideal customer profiles." },
          { id: "customerDiscovery", label: "Where are customers located and how do they typically discover you?" },
          { id: "motivations", label: "What motivates purchases, and what objections stop sales?" },
          { id: "customerData", label: "What customer research, feedback or satisfaction data is available?" },
          { id: "loyalSegments", label: "What are the most profitable or loyal customer segments?" },
        ],
      },
      {
        id: "economics",
        ref: "12 Customer Economics",
        title: "Customer Economics",
        icon: "balance",
        intro: "The value of a customer over time. Estimates are welcome; tell us where the numbers come from if you can.",
        questions: [
          { id: "transactionValue", label: "Average transaction value and purchase frequency" },
          { id: "ltvCac", label: "Estimated customer lifetime value and acquisition cost" },
          { id: "retention", label: "Retention, churn, repeat purchase and referral rates" },
          { id: "database", label: "Size and quality of customer database; segmentation available" },
          { id: "loyaltyPrograms", label: "What loyalty, referral, cross-sell or upsell programs are in place?" },
        ],
      },
      {
        id: "brand",
        ref: "13 Brand & Reputation",
        title: "Brand & Reputation",
        icon: "seal",
        intro: "How the brand looks, sounds and is talked about, and how you would like it to feel.",
        questions: [
          { id: "brandAssets", label: "Do formal brand guidelines, logos and approved assets exist?" },
          { id: "messagingConsistency", label: "Is messaging consistent across website, signage, social and print?" },
          { id: "brandDifferentiation", label: "How does the brand differentiate itself in the market?" },
          { id: "reputation", label: "What is the current reputation across reviews and word of mouth?" },
          { id: "brandFeeling", label: "What should customers think or feel when encountering the brand?" },
        ],
      },
    ],
  },
  {
    id: "market",
    title: "Sales, Systems & Market",
    summary: "How deals are won, the tools behind them and the competitive landscape.",
    icon: "funnel",
    sections: [
      {
        id: "sales",
        ref: "14 Sales Organization & Process",
        title: "Sales Organization & Process",
        icon: "funnel",
        intro: "The path from first inquiry to closed business, and the people who walk it.",
        questions: [
          { id: "salesStructure", label: "Sales team structure, territories and individual responsibilities" },
          { id: "salesFunnel", label: "Describe the sales funnel from first inquiry to closed business." },
          { id: "leadSources", label: "Lead sources, lead quality and lead-to-customer conversion rate" },
          { id: "salesCycle", label: "Typical sales cycle, average deal size and lost-deal reasons" },
          { id: "salesEnablement", label: "What sales training, scripts, incentives or enablement tools are used?" },
        ],
      },
      {
        id: "bizdev",
        ref: "15 Business Development",
        title: "Business Development",
        icon: "link",
        intro: "Relationships and opportunities beyond today's customer base.",
        questions: [
          { id: "partnerships", label: "What partnerships, referral channels or strategic alliances exist?" },
          { id: "crossSell", label: "What opportunities exist to cross-sell and upsell existing accounts?" },
          { id: "underdeveloped", label: "Are there underdeveloped customer segments or distribution channels?" },
          { id: "gameChangers", label: "What major accounts or contracts would materially change the business?" },
          { id: "salesObstacle", label: "What is the biggest obstacle to increasing sales?" },
        ],
      },
      {
        id: "technology",
        ref: "16 Technology & Digital Systems",
        title: "Technology & Digital Systems",
        icon: "chip",
        intro: "The tools you run on. Naming the platforms is enough; we will ask for details later if needed.",
        questions: [
          { id: "webPlatform", label: "Website platform, hosting, analytics and conversion tracking" },
          { id: "crm", label: "CRM, sales pipeline and lead attribution systems" },
          { id: "automation", label: "Email / SMS tools, marketing automation and customer databases" },
          { id: "commerce", label: "E-commerce, online booking, payments or self-service capabilities" },
          { id: "reporting", label: "Reporting dashboards, data quality and access limitations" },
        ],
      },
      {
        id: "competition",
        ref: "17 Competition & Market Threats",
        title: "Competition & Market Threats",
        icon: "rook",
        intro: "The landscape around you: who you compete with and what is changing.",
        questions: [
          { id: "competitors", label: "List the top direct and indirect competitors." },
          { id: "competitorDiffs", label: "How do competitors differ in pricing, product, reach and positioning?" },
          { id: "gainingShare", label: "Which competitors are gaining share and why?" },
          { id: "threats", label: "What industry changes, new entrants or substitutes create threats?" },
          { id: "marketGaps", label: "Where are the largest gaps or unmet needs in the market?" },
        ],
      },
    ],
  },
  {
    id: "partnership",
    title: "Operations & Partnership",
    summary: "Your capacity to grow, and how you would like to work with us.",
    icon: "conversation",
    sections: [
      {
        id: "operations",
        ref: "18 Operations & Capacity",
        title: "Operations & Capacity",
        icon: "gauge",
        intro: "Growth puts pressure on operations. These answers show us where the system might strain first.",
        questions: [
          { id: "demandCapacity", label: "Can the business handle a substantial increase in demand?" },
          { id: "bottlenecks", label: "What staffing, supply, production or service bottlenecks exist?" },
          { id: "scaleChanges", label: "What systems or process changes are needed to scale?" },
          { id: "qualityIssues", label: "What service quality, fulfillment or customer experience issues recur?" },
          { id: "doubleRevenue", label: "What would need to change to double revenue?" },
        ],
      },
      {
        id: "experience",
        ref: "19 Prior Experience & Expectations",
        title: "Prior Experience & Expectations",
        icon: "history",
        intro: "What you have tried before and what you expect from us. This helps us set the right expectations from day one.",
        questions: [
          { id: "whyNow", label: "Why are you seeking strategic advisory support now?" },
          { id: "previousAdvisors", label: "What agencies or consultants have you worked with previously?" },
          { id: "pastLessons", label: "What worked, what disappointed you, and why?" },
          { id: "solveFirst", label: "What problems should Emerge solve first?" },
          { id: "justifyInvestment", label: "What outcomes would justify the advisory investment?" },
        ],
      },
      {
        id: "engagement",
        ref: "20 Engagement Preferences",
        title: "Engagement Preferences",
        icon: "calendarCheck",
        intro: "How you would like the work to run: involvement, cadence, timing and any requirements we should respect.",
        questions: [
          { id: "adviceVsExecution", label: "Which areas require advice only versus hands-on execution?" },
          { id: "participants", label: "Who should participate in working sessions and reviews?" },
          { id: "communicationFrequency", label: "What communication, reporting and meeting frequency do you prefer?" },
          { id: "timelineBudget", label: "What is the desired timeline, budget range and decision process?" },
          { id: "requirements", label: "Are there confidentiality, legal, compliance or access requirements?" },
        ],
      },
      {
        id: "documents",
        ref: "21 Documents & Access Needed",
        title: "Documents & Access",
        icon: "folder",
        intro:
          "Nothing to upload now. Just tell us what exists and what you could share once we begin, so we can plan the discovery phase.",
        questions: [
          { id: "docsBusiness", label: "Existing business plan, financial summary and product / service pricing", type: "choice", options: READINESS },
          { id: "docsMarketing", label: "Marketing plans, campaign reports, budgets and creative assets", type: "choice", options: READINESS },
          { id: "docsSales", label: "Sales reports, CRM exports and customer segment data", type: "choice", options: READINESS },
          { id: "docsDigital", label: "Website analytics, advertising accounts and social platform reports", type: "choice", options: READINESS },
          { id: "docsBrand", label: "Brand guidelines, research, competitor reports and prior proposals", type: "choice", options: READINESS },
          { id: "docsMissing", label: "Missing documents, owners and target delivery dates" },
        ],
      },
    ],
  },
];

export const SECTIONS: readonly Section[] = PARTS.flatMap((p) => p.sections);

export const QUESTION_COUNT = SECTIONS.reduce((n, s) => n + s.questions.length, 0);

/** Netlify field name that carries a section's formatted answers. */
export const sectionField = (sectionId: string) => `section-${sectionId}`;

/** Top-level fields duplicated for quick scanning in the Netlify dashboard. */
export const SUMMARY_FIELDS = ["name", "email", "company", "role", "phone", "revenue", "answered"] as const;
