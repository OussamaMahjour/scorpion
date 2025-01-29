import CodeMirror from "@uiw/react-codemirror"
import {tokyoNight} from "@uiw/codemirror-theme-tokyo-night"
import {xml} from "@codemirror/lang-xml"
import { autocompletion,  CompletionContext, CompletionResult } from "@codemirror/autocomplete";

interface XMLSchema {
  attributes?: string[];
  children?: string[];
  value?: string;
}

// XML Schema definition
const xmlSchema: Record<string, XMLSchema> = {
  pipeline: {
    attributes: ["task", "library"],
    children: ["dataset", "preProcessing", "model", "evaluation"],
  },
  dataset: {
    attributes: ["path", "type"],
    children: ["target", "features"],
  },
  target: {
    children: ["name", "type"],
    value: "hello",
  },
  features: {
    children: ["feature"],
  },
  feature: {
    attributes: ["required"],
    children: ["name", "type"],
  },
  preProcessing: {
    children: ["step"],
  },
  step: {
    children: ["name", "type", "parameters"],
  },
  parameters: {
    children: ["parameter"],
  },
  parameter: {
    children: ["key", "value"],
  },
  model: {
    children: ["hyperparameters"],
  },
  hyperparameters: {
    children: ["hyperparameter"],
  },
  hyperparameter: {
    children: ["name", "value"],
  },
  evaluation: {
    children: ["metric"],
  },
};

// Generate tag autocompletion based on context
const xmlCompletion = (context: CompletionContext): CompletionResult | null => {
  let word = context.matchBefore(/<\w*/);
  if (word) {
    // Get the parent tag by searching backward
    let parentMatch = context.state
      .sliceDoc(0, word.from)
      .match(/<(\w+)[^>]*>\s*$/);
    let parentTag = parentMatch ? parentMatch[1] : null;

    // Suggest child elements based on the parent tag
    if (parentTag && xmlSchema[parentTag]?.children) {
      return {
        from: word.from + 1, // Remove '<' when inserting
        options: xmlSchema[parentTag].children.map((tag) => ({
          label: tag,
          type: "tag",
        })),
      };
    }

    // Default to all top-level tags
    return {
      from: word.from + 1,
      options: Object.keys(xmlSchema).map((tag) => ({ label: tag, type: "tag" })),
    };
  }

  // Handle attribute completion
  let attrMatch = context.matchBefore(/\s+\w*=?/);
  if (attrMatch) {
    let tagMatch = context.state.sliceDoc(0, attrMatch.from).match(/<(\w+)/);
    if (tagMatch) {
      const attributes = xmlSchema[tagMatch[1]]?.attributes || [];
      if (attributes.length > 0) {
        return {
          from: attrMatch.from + 1,
          options: attributes.map((attr) => ({
            label: attr,
            type: "attribute",
          })),
        };
      }
    }
  }

  return null;
};

// Define props for Code component
interface CodeProps {
  onCodeChange: (code: string) => void;
}

const Code: React.FC<CodeProps> = ({ onCodeChange }) => {
  const handleEditorChange = (value: string) => {
    onCodeChange(value); // Send the current code to the parent component
  };

  return (
    <CodeMirror
      value={`<pipeline task="Regression" library="xgboost">
  <dataset path="./test.csv" type="csv">
      <target>
          <name>price</name>
          <type>float</type>
      </target>
  </dataset>
</pipeline>`}
      height="100%"
      width="100%"
      className="h-full text-sm overflow-y-auto min-h-0"
      extensions={[xml(), autocompletion({ override: [xmlCompletion] })]}
      basicSetup={{ autocompletion: true }}
      theme={tokyoNight}
      onChange={handleEditorChange}
    />
  );
};

export default Code;