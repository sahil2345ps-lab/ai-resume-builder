import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { 
  BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, 
  BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, 
  Editor, EditorProvider, HtmlButton, Separator, Toolbar 
} from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';


const PROMPT = 'position title: {positionTitle}. Depends on position title give me 3-4 concise bullet points for my experience in resume. Return the result in JSON format with a key "bulletPoints" containing an array of strings. Do not add experience level. Example: { "bulletPoints": ["Managed team...", "Optimized code..."] }';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
    const [value, setValue] = useState(defaultValue);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false);

    const GenerateSummaryFromAI = async () => {
        
        if (!resumeInfo?.Experience[index]?.title) {
            toast('Please Add Position Title');
            return;
        }

        setLoading(true);
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.Experience[index].title);
        
        
        console.log("Sending Prompt:", prompt);

        try {
            const result = await AIChatSession.sendMessage(prompt);
            const resp = result.response.text();
            
            
            const cleanResponse = resp.replace(/```json|```/g, '').trim();
            console.log("AI Response:", cleanResponse);

            let finalHtml = "";

            try {
                
                const parsedResult = JSON.parse(cleanResponse);
                
                
                if (parsedResult.bulletPoints && Array.isArray(parsedResult.bulletPoints)) {
                    finalHtml = `<ul>${parsedResult.bulletPoints.map(point => `<li>${point}</li>`).join('')}</ul>`;
                } else {
                    
                    finalHtml = cleanResponse; 
                }
            } catch (e) {
                
                finalHtml = cleanResponse;
            }

            
            setValue(finalHtml);

            
            onRichTextEditorChange({
                target: {
                    value: finalHtml
                }
            });

        } catch (error) {
            console.error(error);
            toast("Server Error: Failed to generate");
        }

        setLoading(false);
    }

    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-xs'>Work Summary</label>
                <Button variant="outline" size="sm"
                    onClick={GenerateSummaryFromAI}
                    disabled={loading}
                    className="flex gap-2 border-primary text-primary">
                    {loading ?
                        <LoaderCircle className='animate-spin' /> :
                        <>
                            <Brain className='h-4 w-4' /> Generate from AI
                        </>
                    }
                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e);
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor;