import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom' // 

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false)
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate(); // 

  const onCreate = async () => {
    setLoading(true)
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        ResumeID: uuid,
        UserEmail: user?.primaryEmailAddress?.emailAddress,
        UserName: user?.fullName
      }
    }

    GlobalApi.CreateNewResume(data).then(resp => {
      console.log(resp.data.data.documentId);
      if (resp) {
        setLoading(false);
        
        navigation('/dashboard/resume/' + resp.data.data.documentId + "/edit");
      }
    }, (error) => {
      setLoading(false);
    })
  }

  return (
    <div>
      <div 
        className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed'
        onClick={() => setOpenDialog(true)}
      >
        <div className='flex flex-col items-center justify-center gap-2'>
            <PlusSquare className='w-10 h-10 text-primary' />
            <p className='text-lg font-semibold text-primary mt-2 text-center'>Create New Resume</p>
        </div>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Add a title for your new resume
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Input 
                className="my-2" 
                placeholder="Ex. Full Stack Resume" 
                onChange={(e) => setResumeTitle(e.target.value)} 
            />
            <div className='flex justify-end gap-5'>
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button 
                  disabled={!resumeTitle || loading} 
                  onClick={() => onCreate()}
              >
                {loading ? <Loader2 className='animate-spin' /> : 'Create'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddResume