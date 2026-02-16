import React, { useContext, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'

function Certificate() {
    
    const [certificateList, setCertificateList] = useState([{
        name: '', 
        issuer: '',
        date: ''
    }]);
    
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { resumeId } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // FIX 1: Use Capital 'C' to match your Strapi Screenshot
        if (resumeInfo?.Certificate?.length > 0) {
            setCertificateList(resumeInfo.Certificate)
        }
    }, [resumeInfo])

    const handleChange = (index, event) => {
        const newEntries = [...certificateList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setCertificateList(newEntries);
        
        // Live Update Context
        setResumeInfo({
            ...resumeInfo,
            Certificate: newEntries // Capital C here too
        });
    }

    const AddNewCertificate = () => {
        setCertificateList([...certificateList, {
            name: '', 
            issuer: '',
            date: ''
        }])
    }

    const RemoveCertificate = () => {
        const newEntries = [...certificateList];
        newEntries.pop();
        setCertificateList(newEntries);
        
        setResumeInfo({
            ...resumeInfo,
            Certificate: newEntries
        });
    }
    const onSave = () => {
        setLoading(true);
        
        // 1. Sanitize the list
        const cleanCertificateList = certificateList.map(item => ({
            name: item.name,
            issuer: item.issuer,
            date: item.date
        }));

        // 2. Prepare the payload (Strapi expects { data: { ... } })
        const payload = {
            data: {
                Certificate: cleanCertificateList
            }
        };

        console.log("Sending Payload:", payload);

        // FIX: Pass 'payload' directly. Do NOT use 'payload.data'
        GlobalApi.UpdateResumeDetail(resumeId, payload).then(resp => {
            console.log(resp);
            setLoading(false);
            toast("Success! Certificates Saved.");
        }, (error) => {
            setLoading(false);
            console.error("Full Error:", error);
            
            const errorMessage = error.response?.data?.error?.message || "Server Error";
            toast("Error: " + errorMessage);
        })
    }
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Certificates</h2>
            <p>Add your certifications and achievements</p>

            <div className='mt-5'>
                {certificateList.map((item, index) => (
                    // FIX 3: Added key={index} to fix the red warning
                    <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div className='col-span-2'>
                            <label>Certificate Name</label>
                            <Input name="name" onChange={(e) => handleChange(index, e)} defaultValue={item?.name} />
                        </div>
                        <div>
                            <label>Issuer</label>
                            <Input name="issuer" onChange={(e) => handleChange(index, e)} defaultValue={item?.issuer} />
                        </div>
                        <div>
                            <label>Date</label>
                            <Input name="date" type="text" onChange={(e) => handleChange(index, e)} defaultValue={item?.date} />
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewCertificate} className="text-primary"> + Add More </Button>
                    <Button variant="outline" onClick={RemoveCertificate} className="text-primary"> - Remove </Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    )
}

export default Certificate