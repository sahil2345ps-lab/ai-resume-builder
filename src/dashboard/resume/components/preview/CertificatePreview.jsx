import React from 'react'

function CertificatePreview({ resumeInfo }) {
  return (
  
    <div className='pt-8' style={{ breakInside: 'avoid' }}>
        
        <h2 className='text-center font-bold text-sm mb-2'
            style={{ color: resumeInfo?.themeColor }}
        >
            CERTIFICATION
        </h2>
        <hr style={{ borderColor: resumeInfo?.themeColor }} />

        <div className='grid grid-cols-1 gap-3 my-4'>
            {resumeInfo?.Certificate?.map((certificate, index) => (
                <div key={index}>
                    <h2 className='text-xs font-bold'
                        style={{ color: resumeInfo?.themeColor }}
                    >
                        {certificate?.name}
                    </h2>
                    <h2 className='text-xs flex justify-between'>
                        {certificate?.issuer}
                        <span>{certificate?.date}</span>
                    </h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CertificatePreview