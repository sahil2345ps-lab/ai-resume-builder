import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { AIChatSession } from "../../../service/AIModal";
import { LoaderCircle, Brain, Target, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

function ATSScore({ resumeInfo }) {
    const [jobDesc, setJobDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [open, setOpen] = useState(false);

    const onAnalyze = async () => {
        if (!jobDesc) {
            toast("Please add a Job Description first!");
            return;
        }
        
        setLoading(true);

        
        const prompt = `You are a skilled and very critical ATS (Applicant Tracking System) Scanner. 
        Your task is to evaluate the resume against the provided job description.

        1. Resume Data: ${JSON.stringify(resumeInfo)}
        2. Job Description: ${jobDesc}

        INSTRUCTIONS:
        - You must be strict. Do not give 100% unless the resume is a perfect, word-for-word match.
        - Look for missing technical keywords (e.g., if JD says "Docker" and resume doesn't, deduct points).
        - If the resume is for a "Java Developer" but the JD asks for "Python", the score should be low (below 50%).
        
        OUTPUT FORMAT (JSON ONLY):
        {
            "matchScore": "number (0-100)",
            "missingKeywords": ["array of strings (list missing tech keywords only)"],
            "feedback": "short 1-sentence advice explaining why points were deducted"
        }
        `;

        try {
            const aiResult = await AIChatSession.sendMessage(prompt);
            const respText = await aiResult.response.text();

            
            const cleanResponse = respText.replace(/```json|```/g, '').trim();
            const parsedData = JSON.parse(cleanResponse);

            setResult(parsedData);
        } catch (error) {
            console.error("AI Error:", error);
            toast("Failed to analyze. AI Error.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
                    <Target className='h-4 w-4' /> ATS Score Check
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-white">
                <DialogHeader>
                    <DialogTitle>ATS Resume Scanner</DialogTitle>
                    <DialogDescription>
                        Paste the Job Description below to see how well your resume matches.
                    </DialogDescription>
                </DialogHeader>

                <div className='grid gap-4 py-4'>
                    {/* Input Section */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-600'>Job Description</label>
                        <Textarea 
                            placeholder="Paste the full job description here (e.g. 'We are looking for a React Developer...')" 
                            className="h-40"
                            onChange={(e) => setJobDesc(e.target.value)}
                        />
                    </div>

                    {/* Result Section */}
                    {result && (
                        <div className='p-4 border rounded-lg bg-slate-50 space-y-4'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h3 className='text-lg font-bold'>Match Score</h3>
                                    <p className='text-xs text-gray-500'>Based on keywords & skills</p>
                                </div>
                                <div className={`text-4xl font-black ${Number(result.matchScore) > 70 ? 'text-green-600' : 'text-red-500'}`}>
                                    {result.matchScore}%
                                </div>
                            </div>

                            {/* Missing Keywords */}
                            {result.missingKeywords?.length > 0 && (
                                <div>
                                    <h4 className='text-sm font-semibold flex items-center gap-2 mb-2'>
                                        <AlertTriangle className='h-4 w-4 text-orange-500' />
                                        Missing Keywords:
                                    </h4>
                                    <div className='flex flex-wrap gap-2'>
                                        {result.missingKeywords.map((item, index) => (
                                            <span key={index} className='px-2 py-1 bg-red-100 text-red-600 text-xs rounded-md border border-red-200'>
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Feedback */}
                            <div className='text-sm text-gray-700 bg-white p-2 rounded border'>
                                💡 <strong>AI Tip:</strong> {result.feedback}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end">
                    <Button onClick={onAnalyze} disabled={loading || !jobDesc}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Analyze Resume'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ATSScore