import React, { useState } from "react";
import { Box, Heading, Textarea, Button, Code, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";

const Index = () => {
  const [markdownInput, setMarkdownInput] = useState("");
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [tables, setTables] = useState([]);
  const [mermaidDiagrams, setMermaidDiagrams] = useState([]);

  const processMarkdown = () => {
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const tableRegex = /\|(.*)\|/g;
    const mermaidRegex = /```mermaid([\s\S]*?)```/g;

    const extractedCodeBlocks = [...markdownInput.matchAll(codeBlockRegex)].map((match, index) => ({
      id: `code-block-${index + 1}`,
      content: match[1].trim(),
    }));

    const extractedTables = [...markdownInput.matchAll(tableRegex)].map((match, index) => ({
      id: `table-${index + 1}`,
      content: match[1].trim(),
    }));

    const extractedMermaidDiagrams = [...markdownInput.matchAll(mermaidRegex)].map((match, index) => ({
      id: `mermaid-diagram-${index + 1}`,
      content: match[1].trim(),
    }));

    setCodeBlocks(extractedCodeBlocks);
    setTables(extractedTables);
    setMermaidDiagrams(extractedMermaidDiagrams);
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" marginBottom={4}>
        Markdown Processor
      </Heading>
      <Textarea value={markdownInput} onChange={(e) => setMarkdownInput(e.target.value)} placeholder="Enter your markdown here..." height="200px" marginBottom={4} />
      <Button colorScheme="blue" onClick={processMarkdown}>
        Process Markdown
      </Button>

      {codeBlocks.length > 0 && (
        <Box marginTop={8}>
          <Heading as="h2" size="lg" marginBottom={4}>
            Code Blocks
          </Heading>
          {codeBlocks.map((codeBlock) => (
            <Box key={codeBlock.id} marginBottom={4}>
              <Code>{codeBlock.content}</Code>
            </Box>
          ))}
        </Box>
      )}

      {tables.length > 0 && (
        <Box marginTop={8}>
          <Heading as="h2" size="lg" marginBottom={4}>
            Tables
          </Heading>
          {tables.map((table) => (
            <TableContainer key={table.id} marginBottom={4}>
              <Table>
                <Thead>
                  <Tr>
                    {table.content.split("|").map((header, index) => (
                      <Th key={index}>{header.trim()}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    {table.content.split("|").map((cell, index) => (
                      <Td key={index}>{cell.trim()}</Td>
                    ))}
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          ))}
        </Box>
      )}

      {mermaidDiagrams.length > 0 && (
        <Box marginTop={8}>
          <Heading as="h2" size="lg" marginBottom={4}>
            Mermaid Diagrams
          </Heading>
          {mermaidDiagrams.map((diagram) => (
            <Box key={diagram.id} marginBottom={4}>
              <Code>{diagram.content}</Code>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Index;
