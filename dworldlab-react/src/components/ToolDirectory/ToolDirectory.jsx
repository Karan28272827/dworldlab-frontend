import React from "react";
import "./ToolDirectory.css";
import {
  FileText,
  Calculator,
  Settings,
  Sliders,
  Shield,
  MessageCircle,
  Edit,
  Zap,
  Archive,
  Palette,
  Heart,
  Lightbulb,
  Search,
  DollarSign,
  BarChart,
} from "lucide-react";

const toolCategories = [
  {
    title: "Main Navigation",
    tools: [
      {
        icon: FileText,
        title: "File Tools",
        description: "Convert and manage your files effortlessly.",
      },
      {
        icon: Calculator,
        title: "Calculator Tools",
        description: "Calculate anything you need quickly.",
      },
      {
        icon: Settings,
        title: "Utility Tools",
        description: "Everyday tools for your convenience.",
      },
      {
        icon: Sliders,
        title: "More Tools",
        description: "Explore additional utilities and features.",
      },
    ],
  },
  {
    title: "Additional Links",
    tools: [
      {
        icon: Shield,
        title: "Privacy Policy",
        description: "Understand how we protect your data.",
      },
      {
        icon: FileText,
        title: "Terms of Use",
        description: "Learn about our service terms.",
      },
      {
        icon: MessageCircle,
        title: "Contact Us",
        description: "Reach out for support or suggestions.",
      },
      {
        icon: Edit,
        title: "Feedback Form",
        description: "We value your input and suggestions.",
      },
    ],
  },
  {
    title: "Quick Access",
    tools: [
      {
        icon: Zap,
        title: "Tool Nine",
        description: "Discover more about this tool.",
      },
      {
        icon: Archive,
        title: "Tool Ten",
        description: "Learn how this tool can help you.",
      },
      {
        icon: Palette,
        title: "Tool Eleven",
        description: "Get started with this utility today.",
      },
      {
        icon: Heart,
        title: "Tool Twelve",
        description: "Find out what this tool offers.",
      },
    ],
  },
  {
    title: "Final Links",
    tools: [
      {
        icon: Lightbulb,
        title: "Tool Thirteen",
        description: "Explore the features of this tool.",
      },
      {
        icon: Search,
        title: "Tool Fourteen",
        description: "See how this tool can assist you.",
      },
      {
        icon: DollarSign,
        title: "Tool Fifteen",
        description: "Utilize this tool for your needs.",
      },
      {
        icon: BarChart,
        title: "Tool Sixteen",
        description: "Discover the benefits of this tool.",
      },
    ],
  },
];

export default function ToolDirectory() {
  return (
    <section className="tool-directory">
      <div className="container">
        <div className="columns">
          {toolCategories.map((category, index) => (
            <div key={index} className="column">
              <h3 className="category-title">{category.title}</h3>
              <ul className="tool-list">
                {category.tools.map((tool, i) => (
                  <li key={i} className="tool-item">
                    <tool.icon className="tool-icon" strokeWidth={1.6} />
                    <div className="tool-text">
                      <span className="tool-title_2">{tool.title}</span>
                      <span className="tool-description">
                        {tool.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bottom-bar">
          <span>Ready to explore tools?</span>
          <a href="#" className="signup-link">
            Sign up for free
          </a>
        </div>
      </div>
    </section>
  );
}
