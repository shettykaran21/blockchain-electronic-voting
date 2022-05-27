import { Button, Container, Header, Icon } from 'semantic-ui-react'

import { Link } from '../../routes'

const Heading = () => (
  <Container text className="cont">
    <div style={{ float: 'left', marginTop: '10%' }}>
      <Header as="h4" style={{ color: 'grey' }}>
        Register/ Sign in for the company
      </Header>
      <Link route="./company_login">
        <Button
          primary
          size="huge"
          style={{ color: 'white', backgroundColor: '#627eea' }}
        >
          <Icon name="left arrow" />
          Company
        </Button>
      </Link>
    </div>

    <div style={{ float: 'right', marginTop: '10%' }}>
      <Header as="h4" style={{ color: 'grey' }}>
        {' '}
        Sign in for Voters!
      </Header>
      <Link route="/voter_login">
        <Button
          primary
          size="huge"
          style={{ color: 'white', backgroundColor: '#627eea' }}
        >
          Voters
          <Icon name="right arrow" />
        </Button>
      </Link>
    </div>
  </Container>
)

export default Heading
