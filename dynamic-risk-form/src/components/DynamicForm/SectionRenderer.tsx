import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { FormConfig } from "../../types/form";
import type { UseFormReturn } from "react-hook-form";
import FieldRenderer from "./FieldRenderer";
import useConditionalLogic from "../../hooks/useConditionalLogic";
import { Box, Collapse } from "@mui/material";

interface Props {
  config: FormConfig;
  form: UseFormReturn<any>;
}

export default function SectionRenderer({ config, form }: Props) {
  const { watch, setValue } = form;

  return (
    <>
      {config.sections.map((section) => (
        <Accordion key={section.id} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${section.id}-content`}
            id={`${section.id}-header`}
          >
            {section.title}
          </AccordionSummary>

          <AccordionDetails>
            <Box>
              {section.questions.map((q) => {
                const visible = useConditionalLogic(watch, setValue, q);
                // Each field is wrapped with a Collapse for smooth animation
                return (
                  <Collapse
                    key={q.id}
                    in={visible}
                    timeout="auto"
                    unmountOnExit
                    aria-expanded={visible}
                    aria-controls={`${q.id}-panel`}
                  >
                    <div id={`${q.id}-panel`}>
                      <FieldRenderer question={q} form={form} visible={visible} />
                    </div>
                  </Collapse>
                );
              })}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
