import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import PersonalDetailPreview from '@/dashboard/resume/components/preview/PersonalDetailPreview'
import SummaryPreview from '@/dashboard/resume/components/preview/SummaryPreview'
import React, { useContext } from 'react'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
import CertificatePreview from './preview/CertificatePreview'

function ResumePreview() {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-10 border-t-[20px] w-full'
    style={{
        borderColor:resumeInfo?.themeColor
    }}
    >
        {/*Personal Detail*/}
             <PersonalDetailPreview resumeInfo={resumeInfo}/>

        {/*Summary*/}
              <SummaryPreview resumeInfo={resumeInfo}/>

        {/*Professional Experience */}
               <ExperiencePreview resumeInfo={resumeInfo}/>

        {/*Educational*/}
                <EducationalPreview resumeInfo={resumeInfo}/>

        {/*Skills*/}
             <SkillsPreview resumeInfo={resumeInfo}/>

        {/*Certificate*/}
              <CertificatePreview resumeInfo={resumeInfo} /> 
    </div>
  )
}

export default ResumePreview