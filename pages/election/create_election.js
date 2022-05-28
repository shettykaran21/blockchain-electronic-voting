import Layout from '../../components/layout'
import FormContainer from '../../components/ui/form-container'
import ElectionForm from '../../components/election/election-form'

const CreateElectionPage = () => {
  return (
    <Layout>
      <FormContainer>
        <h2 className="text-gray-600 mb-8 text-center font-bold text-2xl">
          Create an election
        </h2>
        <ElectionForm />
      </FormContainer>
    </Layout>
  )
}

export default CreateElectionPage
