import AdminPageLayout from '@/components/custom/admin/shared/AdminPageLayout'
import { allSubscriber, allSubscriberCount } from './action'
import { AddCustomSubscriber } from './c'
import { SubscribersTable } from './SubscribersTable'
import SendEmail from './sendEmai'

const SendEmailPage = async () => {
  const countSubscriber = await allSubscriberCount()
  const allSubscribers = await allSubscriber()
  
  return <AdminPageLayout title="Send Email">
    <div className="flex justify-between mt-5">
      <p>Total Subscriber : {countSubscriber}</p>
      <div className="flex gap-2">
        <SendEmail subscribers={allSubscribers} />
        <AddCustomSubscriber />
      </div>
    </div>
    <SubscribersTable subscribers={allSubscribers} />
  </AdminPageLayout>
}

export default SendEmailPage
