'use client'

import { Button } from '@/components/ui/button'
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '@/components/ui/Credenza'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { XEmbed } from 'react-social-media-embed'

const AddXPost = () => {
  const [show, setShow] = useState(false)
  const [postLink, setPostLink] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { refresh } = useRouter()

  const validatePostLink = (link: string) => {
    const regex = /^(https?:\/\/)?(www\.)?twitter\.com\/.+$/;
    return regex.test(link);
  };

  const hendelSebmit = () => {
    const isValid = validatePostLink(postLink);
    setError(isValid ? '' : 'Invalid post link');
    if (isValid) {
      setLoading(true);
      fetch('/api/addpost/x', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postLink }),
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          refresh();
          setPostLink('');
          setShow(false);
        })
        .catch((error) => {
          console.error(error);
          setError('Server error');
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <Credenza onOpenChange={setShow} open={show}>
      <CredenzaTrigger asChild>
        <Button>Open modal</Button>
      </CredenzaTrigger>
      {show && (
        <CredenzaContent className="max-w-[500px]">
          <CredenzaHeader>
            <CredenzaTitle>Add New X post</CredenzaTitle>
            <CredenzaDescription> </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody>
            <div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div>
                    <Label>Post Link</Label>
                  </div>

                  <Input
                    placeholder="Enter Post Link"
                    required
                    value={postLink}
                    onChange={(e) => setPostLink(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="aspect-square border flex justify-center items-center">
                    {postLink ? (
                      <XEmbed width={'full'} url={postLink} />
                    ) : (
                      'Please enter a valid post link.'
                    )}
                  </div>
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </CredenzaBody>
          <CredenzaFooter>
            <Button disabled={loading} onClick={hendelSebmit}>
              Add
            </Button>
            <CredenzaClose asChild>
              <Button disabled={loading} variant="outline">
                Close
              </Button>
            </CredenzaClose>
          </CredenzaFooter>
        </CredenzaContent>
      )}
    </Credenza>
  )
}

export default AddXPost
