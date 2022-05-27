import PropTypes from 'prop-types'
import { Button, Container, Header, Icon } from 'semantic-ui-react'

import { Link } from '../../routes'

const Heading = ({ mobile }) => (
  <Container text className="cont">
    <Header
      as="h1"
      content="A secure, blockchain-based electronic voting system."
      inverted
      style={{
        fontSize: '3em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '2em',
        color: 'black',
      }}
    />
    <Header
      as="h4"
      content="Make your vote count!"
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
        color: 'grey',
      }}
    />
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

Heading.propTypes = {
  mobile: PropTypes.bool,
}

export default Heading
