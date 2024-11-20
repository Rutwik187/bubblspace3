export const microlearningData = {
  title: "NextJS Microlearning",
  description: "Learn NextJS by actually building something",

  microLearningReactflow: {
    nodes: [
      {
        id: "B001",
        type: "custom",
        data: {
          title: "Installing Ollama",
          description:
            "Learn to install the Ollama platform required for model setup.",
          skills: ["Install Ollama", "Command line proficiency"],
          content:
            "Ensure you have curl installed on your system to run the installation script. Use the documentation from the official website for guidance.",
        },
        position: {
          x: 0,
          y: 0,
        },
      },
      {
        id: "B002",
        type: "custom",
        data: {
          title: "Setup Python Ollama Library",
          description:
            "Installation of necessary Python library for Ollama integration.",
          skills: ["Python package installation", "Importing libraries"],
          content:
            "This library allows interaction with Ollama models using Python scripts. Refer to the package documentation during setup.",
        },
        position: {
          x: 300,
          y: 100,
        },
      },
      {
        id: "B003",
        type: "custom",
        data: {
          title: "Model Loading and Testing",
          description: "Load and test the desired Ollama model for usage.",
          skills: ["Model downloading", "Model testing"],
          content:
            "Ensure you have enough disk space as models can be quite large. The Ollama Model Hub is a useful resource for this task.",
        },
        position: {
          x: 600,
          y: 200,
        },
      },
      {
        id: "B004",
        type: "custom",
        data: {
          title: "Define and Integrate Tools",
          description:
            "Define essential functions as callable tools in the Ollama environment.",
          skills: ["Function conversion", "Tool integration"],
          content:
            "Before using the functions, make sure they return the expected data types and formats. The Langchain Core documentation provides necessary insights.",
        },
        position: {
          x: 900,
          y: 300,
        },
      },
      {
        id: "B005",
        type: "custom",
        data: {
          title: "Recursive Function Execution",
          description:
            "Implement recursive logic to perform sequential execution with the Ollama environment.",
          skills: ["Recursive function calling", "Automation"],
          content:
            "Ensure your functions handle recursion depth properly to avoid infinite loops. Python Recursive Functions documentation will be helpful.",
        },
        position: {
          x: 1200,
          y: 400,
        },
      },
    ],
    edges: [
      {
        id: "E1",
        source: "B001",
        target: "B002",
      },
      {
        id: "E2",
        source: "B002",
        target: "B003",
      },
      {
        id: "E3",
        source: "B003",
        target: "B004",
      },
      {
        id: "E4",
        source: "B004",
        target: "B005",
      },
    ],
  },
  content: {
    useCase: {
      title: "Automated Stock Price Notifier",
      sections: [
        {
          sectionId: "DN001",
          title: "Setting Up the Environment",
          content:
            "Before we begin building our Automated Stock Price Notifier, it's crucial to set the environment. Start by installing the Ollama platform on a Linux system using the shell command provided in Level 1. Ensure curl is installed:\\n```bash\\n!curl -fsSL https://ollama.com/install.sh | sh\\n```\\nThis step prepares the system for subsequent Python integrations and model management.",
        },
        {
          sectionId: "DN002",
          title: "Installing Python Ollama Library",
          content:
            "Next, integrate Python capabilities by installing the Ollama library. This will allow you to interact with the models within scripts.\\n```bash\\n%pip install ollama\\n```\\nUse this library to simplify communication with Ollama models and execute functions in Python. Remember to verify the installation before proceeding.",
        },
        {
          sectionId: "DN003",
          title: "Model Selection and Loading",
          content:
            "For a stock notifier, choose a model adept in data analysis, such as 'hermes-2-pro-llama-3-8b-tools'. Download the model with:\\n```bash\\n!ollama pull interstellarninja/hermes-2-pro-llama-3-8b-tools\\n```\\nEnsure ample disk space, as models are large. Successfully loading the model is critical, as it forms the project's core.",
        },
        {
          sectionId: "DN004",
          title: "Defining Callable Tools",
          content:
            "Define Python functions as callable tools in the Ollama environment, converting them for integration:\\n```python\\nfrom ollama import convert_to_openai_tool\\n\\ndef fetch_stock_data(symbol):\\n    # Fetch stock data logic here\\n    pass\\n\\ntools = [convert_to_openai_tool(fetch_stock_data)]\\n```\\nEnsure correctness in data return types and formats. Mismanagement here can lead to function errors.",
        },
        {
          sectionId: "DN005",
          title: "Implementing Recursive Logic",
          content:
            "The core of our notifier is the recursive pattern for sequential data fetch and update. Implement it with care:\\n```python\\ndef recursive_tool_calling(stock, depth=3):\\n    # Base case\\n    if depth == 0:\\n        return\\n    \\n    # Fetch data\\n    data = fetch_stock_data(stock)\\n    \\n    # Make decisions\\n    if data['price_change'] > 5:\\n        notify_user(stock, data)\\n    \\n    # Recursive call\\n    recursive_tool_calling(stock, depth - 1)\\n\\nmessages = recursive_tool_calling('AAPL')\\n```\\nThis function will check for significant stock changes and notify appropriately. Avoid infinite loops by properly handling recursion depth.",
        },
        {
          sectionId: "DN006",
          title: "Notifying Users",
          content:
            "Integrate a messaging system to inform users of significant stock price changes. Use existing messaging APIs or build a simple one:\\n```python\\ndef notify_user(stock, data):\\n    # Notification logic\\n    print(f'Stock {stock} has significant change: {data['price_change']}%')\\n```\\nEnsuring timely and format-specific notifications will enhance user experience.",
        },
        {
          sectionId: "DN007",
          title: "Testing and Optimization",
          content:
            "Finally, thoroughly test your application to ensure recursive logic effectiveness and notification reliability. Incorporate error handling to tackle potential API failures or network issues:\\n```python\\ntry:\\n    recursive_tool_calling('AAPL')\\nexcept Exception as e:\\n    print(f'An error occurred: {e}')\\n```\\nOptimize recursive calls and test under real-world conditions to validate performance and reliability.",
        },
      ],
    },
  },
  quiz: {
    questions: [
      {
        questionId: "Q001",
        type: "multipleChoice",
        question:
          "What is the primary function of the Ollama platform in the context of recursive function execution?",
        options: [
          "To provide a graphical user interface",
          "To set up and execute machine learning models",
          "To integrate with cloud storage solutions",
          "To serve as a web development framework",
        ],
        correctAnswer: "To set up and execute machine learning models",
      },
      {
        questionId: "Q002",
        type: "trueFalse",
        question:
          "The Ollama Python library simplifies communication with models using Python scripts.",
        correctAnswer: true,
      },
      {
        questionId: "Q003",
        type: "codingChallenge",
        question:
          "Write a Python function to fetch and print stock data for a given symbol using Ollama tools.",
        starterCode:
          "def fetch_and_print_stock_data(symbol):\n    # Use Ollama tool fetching logic\n    fetch_stock_data(symbol)",
        solution:
          'def fetch_and_print_stock_data(symbol):\n    # Assume fetch_stock_data is already integrated with Ollama\n    data = fetch_stock_data(symbol)\n    print(f"Stock {symbol} data: {data}")',
      },
      {
        questionId: "Q004",
        type: "multipleChoice",
        question:
          "Which command is used to install the Ollama platform on a Linux system?",
        options: [
          "!apt-get install ollama",
          "!yum install ollama",
          "!curl -fsSL https://ollama.com/install.sh | sh",
          "!pacman -S ollama",
        ],
        correctAnswer: "!curl -fsSL https://ollama.com/install.sh | sh",
      },
      {
        questionId: "Q005",
        type: "trueFalse",
        question:
          "Recursive functions can lead to infinite loops if not properly managed.",
        correctAnswer: true,
      },
      {
        questionId: "Q006",
        type: "multipleChoice",
        question:
          "Which of the following is a key consideration when converting functions to callable tools in Ollama?",
        options: [
          "Ensuring functions have GUI support",
          "Preferring functions without parameters",
          "Correctness in data return types and formats",
          "Reducing the number of imported libraries",
        ],
        correctAnswer: "Correctness in data return types and formats",
      },
      {
        questionId: "Q007",
        type: "codingChallenge",
        question:
          "Implement the base case for stopping a recursive function after a specific depth.",
        starterCode:
          "def recursive_tool_calling(stock, depth=3):\n    # Base case\n    pass",
        solution:
          "def recursive_tool_calling(stock, depth=3):\n    # Base case\n    if depth == 0:\n        return",
      },
      {
        questionId: "Q008",
        type: "trueFalse",
        question:
          "Models downloaded from Ollama can be very large and require ample disk space.",
        correctAnswer: true,
      },
      {
        questionId: "Q009",
        type: "multipleChoice",
        question:
          "Which of the following tasks is included in setting up an automated stock price notifier using Ollama?",
        options: [
          "Designing a user interface",
          "Loading and testing a suitable data model",
          "Creating an interactive dashboard",
          "Generating reports in PDF format",
        ],
        correctAnswer: "Loading and testing a suitable data model",
      },
      {
        questionId: "Q010",
        type: "codingChallenge",
        question:
          "Write a function to notify users when the stock price change exceeds a threshold.",
        starterCode:
          "def notify_user(stock, data):\n    # Notification logic here\n    pass",
        solution:
          "def notify_user(stock, data):\n    if data['price_change'] > 5:\n        print(f'Stock {stock} has significant change: {data['price_change']}%')",
      },
    ],
  },
};
