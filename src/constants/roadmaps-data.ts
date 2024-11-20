export const roadmapData = {
  1: {
    title: "LLM Output Structuring",
    nodes: [
      {
        id: "1",
        type: "custom",
        data: {
          title: "LLM Output Structuring Fundamentals",
          description: "Core concepts for structured LLM output",
          skills: [
            "Pydantic",
            "JSON Schemas",
            "Regular Expressions",
            "Finite State Machines",
          ],
          content:
            "Understanding how to structure LLM output is crucial for creating reliable AI applications. Focus on Pydantic for data validation, JSON schemas for data structure definition, regular expressions for pattern matching, and Finite State Machines (FSMs) for enforcing output constraints.",
        },
        position: { x: 250, y: 0 },
      },
      {
        id: "2",
        type: "custom",
        data: {
          title: "Pydantic and JSON Schema Integration",
          description: "Using Pydantic with LLMs",
          skills: [
            "Pydantic Models",
            "JSON Schema Generation",
            "Data Validation",
          ],
          content:
            "Pydantic is powerful for defining data structures in Python. Learn to create Pydantic models, generate JSON schemas from these models, and use them for data validation. This forms the basis for defining structured output from LLMs.",
        },
        position: { x: 0, y: 300 },
      },
      {
        id: "3",
        type: "custom",
        data: {
          title: "FSM Construction and Integration",
          description: "Building and using FSMs with LLMs",
          skills: [
            "FSM Design",
            "Regex to FSM Conversion",
            "Custom Sampling Functions",
          ],
          content:
            "Finite State Machines are key to constraining LLM output. Learn to design FSMs, convert regular expressions to FSMs, and integrate them with LLMs using custom sampling functions. This allows for fine-grained control over generated content.",
        },
        position: { x: 500, y: 300 },
      },
      {
        id: "4",
        type: "custom",
        data: {
          title: "Advanced LLM Output Control",
          description: "Complex constraint handling",
          skills: [
            "Parallel FSM Evaluation",
            "Ambiguity Resolution",
            "Performance Optimization",
          ],
          content:
            "For sophisticated applications, learn advanced techniques like parallel FSM evaluation for handling multiple constraints simultaneously. Explore methods for resolving ambiguities in natural language tasks and optimizing performance for real-time applications.",
        },
        position: { x: 250, y: 600 },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
      { id: "e2-4", source: "2", target: "4" },
      { id: "e3-4", source: "3", target: "4" },
    ],
  },
  2: {
    title: "Advanced React Patterns",
    nodes: [
      {
        id: "1",
        type: "custom",
        data: {
          title: "React Hooks Deep Dive",
          description: "Mastering React Hooks for state and side effects",
          skills: ["useState", "useEffect", "useContext", "Custom Hooks"],
          content:
            "Dive deep into React Hooks, understanding their usage patterns and best practices. Learn to manage component state, side effects, and context with hooks, and create custom hooks for reusable logic across your application.",
        },
        position: { x: 250, y: 0 },
      },
      {
        id: "2",
        type: "custom",
        data: {
          title: "Advanced Component Composition",
          description: "Techniques for flexible and reusable components",
          skills: [
            "Render Props",
            "Higher-Order Components",
            "Compound Components",
          ],
          content:
            "Explore advanced component composition techniques to create highly reusable and flexible components. Learn to implement render props, higher-order components, and compound components to solve complex UI challenges.",
        },
        position: { x: 0, y: 300 },
      },
      {
        id: "3",
        type: "custom",
        data: {
          title: "State Management Patterns",
          description: "Effective state management in React applications",
          skills: ["Context API", "Redux", "MobX", "Recoil"],
          content:
            "Master various state management patterns in React. Compare and contrast different approaches, from the built-in Context API to external libraries like Redux, MobX, and Recoil. Learn when to use each approach for optimal application architecture.",
        },
        position: { x: 500, y: 300 },
      },
      {
        id: "4",
        type: "custom",
        data: {
          title: "Performance Optimization",
          description:
            "Techniques for optimizing React application performance",
          skills: [
            "Memoization",
            "Code Splitting",
            "Lazy Loading",
            "Virtualization",
          ],
          content:
            "Learn advanced techniques to optimize the performance of React applications. Dive into memoization with useMemo and useCallback, implement code splitting and lazy loading for faster initial loads, and explore virtualization for rendering large lists efficiently.",
        },
        position: { x: 250, y: 600 },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
      { id: "e2-4", source: "2", target: "4" },
      { id: "e3-4", source: "3", target: "4" },
    ],
  },
  3: {
    title: "GraphQL Mastery",
    nodes: [
      {
        id: "1",
        type: "custom",
        data: {
          title: "GraphQL Fundamentals",
          description: "Core concepts and principles of GraphQL",
          skills: [
            "Schema Definition",
            "Queries",
            "Mutations",
            "Subscriptions",
          ],
          content:
            "Start your GraphQL journey by understanding its core concepts. Learn how to define schemas, write queries to fetch data, use mutations to modify data, and implement subscriptions for real-time updates.",
        },
        position: { x: 250, y: 0 },
      },
      {
        id: "2",
        type: "custom",
        data: {
          title: "Apollo Client Integration",
          description: "Using Apollo Client with React applications",
          skills: [
            "Apollo Client Setup",
            "Queries and Mutations",
            "Caching",
            "Error Handling",
          ],
          content:
            "Master Apollo Client for seamless GraphQL integration in React applications. Learn to set up Apollo Client, execute queries and mutations, leverage Apollo's powerful caching system, and implement effective error handling strategies.",
        },
        position: { x: 0, y: 300 },
      },
      {
        id: "3",
        type: "custom",
        data: {
          title: "Server-Side GraphQL",
          description: "Building robust GraphQL servers",
          skills: [
            "Resolver Functions",
            "DataLoader",
            "Authentication",
            "Authorization",
          ],
          content:
            "Dive into server-side GraphQL development. Learn to write efficient resolver functions, optimize performance with DataLoader, implement authentication and authorization, and structure your GraphQL server for scalability.",
        },
        position: { x: 500, y: 300 },
      },
      {
        id: "4",
        type: "custom",
        data: {
          title: "Advanced GraphQL Patterns",
          description: "Advanced techniques and best practices",
          skills: [
            "Schema Stitching",
            "Federation",
            "Code Generation",
            "Testing",
          ],
          content:
            "Explore advanced GraphQL patterns and techniques. Learn about schema stitching and federation for building modular GraphQL services, leverage code generation tools, and master testing strategies for GraphQL APIs.",
        },
        position: { x: 250, y: 600 },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
      { id: "e2-4", source: "2", target: "4" },
      { id: "e3-4", source: "3", target: "4" },
    ],
  },
  4: {
    title: "Microservices Architecture",
    nodes: [
      {
        id: "1",
        type: "custom",
        data: {
          title: "Microservices Fundamentals",
          description: "Core concepts and principles of microservices",
          skills: [
            "Service Decomposition",
            "API Design",
            "Inter-Service Communication",
            "Data Management",
          ],
          content:
            "Understand the fundamental principles of microservices architecture. Learn strategies for decomposing monolithic applications, designing robust APIs, implementing effective inter-service communication, and managing data in a distributed system.",
        },
        position: { x: 250, y: 0 },
      },
      {
        id: "2",
        type: "custom",
        data: {
          title: "Containerization with Docker",
          description: "Using Docker for microservices deployment",
          skills: [
            "Docker Basics",
            "Dockerfile Creation",
            "Docker Compose",
            "Container Orchestration",
          ],
          content:
            "Master Docker for containerizing microservices. Learn Docker basics, create efficient Dockerfiles, use Docker Compose for multi-container applications, and understand the principles of container orchestration for scalable deployments.",
        },
        position: { x: 0, y: 300 },
      },
      {
        id: "3",
        type: "custom",
        data: {
          title: "Kubernetes Orchestration",
          description: "Managing microservices with Kubernetes",
          skills: [
            "Kubernetes Architecture",
            "Pods and Deployments",
            "Services and Ingress",
            "ConfigMaps and Secrets",
          ],
          content:
            "Dive into Kubernetes for orchestrating microservices at scale. Understand Kubernetes architecture, work with pods and deployments, manage networking with services and ingress, and handle configuration and secrets.",
        },
        position: { x: 500, y: 300 },
      },
      {
        id: "4",
        type: "custom",
        data: {
          title: "Microservices Patterns and Best Practices",
          description: "Advanced patterns for robust microservices",
          skills: [
            "Service Discovery",
            "Circuit Breaker",
            "API Gateway",
            "Event-Driven Architecture",
          ],
          content:
            "Explore advanced microservices patterns and best practices. Implement service discovery for dynamic environments, use the circuit breaker pattern for fault tolerance, design effective API gateways, and leverage event-driven architecture for loosely coupled systems.",
        },
        position: { x: 250, y: 600 },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
      { id: "e2-4", source: "2", target: "4" },
      { id: "e3-4", source: "3", target: "4" },
    ],
  },
  5: {
    title: "Machine Learning Fundamentals",
    nodes: [
      {
        id: "1",
        type: "custom",
        data: {
          title: "Introduction to Machine Learning",
          description: "Core concepts and types of machine learning",
          skills: [
            "Supervised Learning",
            "Unsupervised Learning",
            "Reinforcement Learning",
            "Feature Engineering",
          ],
          content:
            "Begin your machine learning journey by understanding the fundamental concepts. Explore different types of machine learning, including supervised, unsupervised, and reinforcement learning. Learn the importance of feature engineering in preparing data for ML models.",
        },
        position: { x: 250, y: 0 },
      },
      {
        id: "2",
        type: "custom",
        data: {
          title: "Supervised Learning Algorithms",
          description: "Key supervised learning techniques",
          skills: [
            "Linear Regression",
            "Logistic Regression",
            "Decision Trees",
            "Support Vector Machines",
          ],
          content:
            "Dive into supervised learning algorithms. Master linear and logistic regression for predictive modeling, understand decision trees for classification and regression tasks, and explore support vector machines for complex classification problems.",
        },
        position: { x: 0, y: 300 },
      },
      {
        id: "3",
        type: "custom",
        data: {
          title: "Unsupervised Learning and Clustering",
          description: "Techniques for uncovering patterns in data",
          skills: [
            "K-Means Clustering",
            "Hierarchical Clustering",
            "Principal Component Analysis",
            "Dimensionality Reduction",
          ],
          content:
            "Explore unsupervised learning techniques for discovering patterns in data. Learn k-means and hierarchical clustering for grouping similar data points, and understand dimensionality reduction techniques like PCA for feature selection and data visualization.",
        },
        position: { x: 500, y: 300 },
      },
      {
        id: "4",
        type: "custom",
        data: {
          title: "Introduction to Neural Networks",
          description: "Foundations of deep learning",
          skills: [
            "Perceptrons",
            "Backpropagation",
            "Activation Functions",
            "Deep Neural Networks",
          ],
          content:
            "Begin your journey into deep learning by understanding the basics of neural networks. Learn about perceptrons, the building blocks of neural networks, master the backpropagation algorithm, explore various activation functions, and dive into the architecture of deep neural networks.",
        },
        position: { x: 250, y: 600 },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
      { id: "e2-4", source: "2", target: "4" },
      { id: "e3-4", source: "3", target: "4" },
    ],
  },
  6: {
    title: "Blockchain Development",
    nodes: [
      {
        id: "1",
        type: "custom",
        data: {
          title: "Blockchain Fundamentals",
          description: "Core concepts and principles of blockchain technology",
          skills: [
            "Distributed Ledger",
            "Consensus Mechanisms",
            "Cryptography",
            "Smart Contracts",
          ],
          content:
            "Start your blockchain journey by understanding its fundamental concepts. Learn about distributed ledgers, various consensus mechanisms, the role of cryptography in blockchain, and get an introduction to smart contracts.",
        },
        position: { x: 250, y: 0 },
      },
      {
        id: "2",
        type: "custom",
        data: {
          title: "Ethereum and Solidity",
          description: "Developing on the Ethereum platform",
          skills: [
            "Ethereum Basics",
            "Solidity Programming",
            "Web3.js",
            "Truffle Framework",
          ],
          content:
            "Dive into Ethereum development. Learn the basics of the Ethereum platform, master Solidity for writing smart contracts, use Web3.js for interacting with Ethereum networks, and leverage the Truffle framework for streamlined development.",
        },
        position: { x: 0, y: 300 },
      },
      {
        id: "3",
        type: "custom",
        data: {
          title: "Decentralized Applications (DApps)",
          description: "Building and deploying DApps",
          skills: [
            "DApp Architecture",
            "IPFS",
            "MetaMask Integration",
            "Token Standards (ERC20, ERC721)",
          ],
          content:
            "Learn to build decentralized applications (D Apps). Understand DApp architecture, use IPFS for decentralized storage, integrate MetaMask for user authentication, and implement token standards like ERC20 for fungible tokens and ERC721 for non-fungible tokens (NFTs).",
        },
        position: { x: 500, y: 300 },
      },
      {
        id: "4",
        type: "custom",
        data: {
          title: "Advanced Blockchain Concepts",
          description: "Exploring advanced topics in blockchain development",
          skills: [
            "Layer 2 Solutions",
            "Interoperability",
            "Governance Models",
            "Blockchain Security",
          ],
          content:
            "Dive into advanced blockchain concepts. Explore Layer 2 scaling solutions, understand blockchain interoperability and cross-chain communication, learn about various governance models in blockchain networks, and master best practices for blockchain security.",
        },
        position: { x: 250, y: 600 },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
      { id: "e2-4", source: "2", target: "4" },
      { id: "e3-4", source: "3", target: "4" },
    ],
  },
  7: {
    title: "Pydantic Objects as Output from LLMs",
    nodes: [
      {
        id: "1",
        type: "custom",
        data: {
          title: "Introduction to Game Setting Types",
          description:
            "Understanding the basics of game setting types and their implementation",
          skills: ["Enum in Python", "Pydantic Basics", "Data Modeling"],
          content:
            "Learn how to define game setting types using Python's Enum class and integrate them with Pydantic for robust data modeling in LLM applications.",
        },
        position: { x: 250, y: 0 },
      },
      {
        id: "2",
        type: "custom",
        data: {
          title: "Defining Pydantic Models for Game Settings",
          description:
            "Creating structured data models for game settings using Pydantic",
          skills: ["Pydantic Models", "Data Validation", "Type Hinting"],
          content:
            "Master the creation of Pydantic models to represent game settings, including attributes like setting type, description, and ID. Learn how to leverage Pydantic's built-in validation and type hinting features.",
        },
        position: { x: 0, y: 300 },
      },
      {
        id: "3",
        type: "custom",
        data: {
          title: "JSON Schema Generation and Regex Conversion",
          description:
            "Generating JSON schemas from Pydantic models and converting them to regex patterns",
          skills: [
            "JSON Schema",
            "Regex Pattern Generation",
            "Data Structure Conversion",
          ],
          content:
            "Explore techniques for automatically generating JSON schemas from Pydantic models and converting these schemas into regex patterns for advanced input validation and parsing of LLM outputs.",
        },
        position: { x: 500, y: 300 },
      },
      {
        id: "4",
        type: "custom",
        data: {
          title: "Integrating LLMs with Pydantic Objects",
          description:
            "Techniques for using Pydantic objects with Language Models like Llama",
          skills: ["LLM Integration", "Prompt Engineering", "Output Parsing"],
          content:
            "Learn how to integrate Language Models (like Llama) with Pydantic objects. Master prompt engineering techniques to guide LLMs in generating outputs that conform to your Pydantic models, and develop robust parsing strategies for LLM responses.",
        },
        position: { x: 250, y: 600 },
      },
      {
        id: "5",
        type: "custom",
        data: {
          title: "Advanced Pydantic Techniques for LLM Outputs",
          description:
            "Exploring advanced Pydantic features for complex LLM output structures",
          skills: [
            "Nested Models",
            "Custom Validators",
            "Dynamic Model Generation",
          ],
          content:
            "Dive into advanced Pydantic techniques such as creating nested models, implementing custom validators, and dynamically generating models based on LLM outputs. Learn to handle complex, nested structures often produced by sophisticated LLM prompts.",
        },
        position: { x: 0, y: 900 },
      },
      {
        id: "6",
        type: "custom",
        data: {
          title: "Error Handling and Output Refinement",
          description:
            "Strategies for handling errors and refining LLM outputs to fit Pydantic models",
          skills: [
            "Error Handling",
            "Output Refinement",
            "Fallback Strategies",
          ],
          content:
            "Master error handling techniques when LLM outputs don't perfectly match your Pydantic models. Develop strategies for output refinement, including fallback options and iterative improvement of LLM responses to ensure data integrity.",
        },
        position: { x: 500, y: 900 },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
      { id: "e2-4", source: "2", target: "4" },
      { id: "e3-4", source: "3", target: "4" },
      { id: "e4-5", source: "4", target: "5" },
      { id: "e4-6", source: "4", target: "6" },
      { id: "e5-6", source: "5", target: "6" },
    ],
  },
};
