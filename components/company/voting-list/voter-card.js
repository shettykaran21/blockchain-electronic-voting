const VoterCard = ({ voterDetails }) => {
  const { email } = voterDetails

  return (
    <div className="rounded-lg shadow-lg bg-black-secondary max-w-[16rem] p-6">
      <p className="text-white-900 text-l font-medium">{email}</p>
    </div>
  )
}

export default VoterCard
