import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import {
  Container,
  Grid,
  Header,
  Image,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react'

import Heading from '../components/home/Heading'

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive>
        <Helmet>
          <title>HomePage</title>
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="../../static/logo3.png"
          />
        </Helmet>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
              className="menu"
            >
              <Container>
                <h1
                  style={{
                    color: '#627eea',
                    verticalAlign: 'middle',
                    fontFamily: 'Freestyle Script',
                    fontSize: '400%',
                    paddingLeft: '42%',
                  }}
                >
                  BlockVotes
                </h1>
              </Container>
            </Menu>
            <Heading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomePage = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Private
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Doesn&apos;t give any information <br />
              regarding personal data.
            </p>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Secure
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Not even a single chance of shutting <br /> down of the system.
            </p>
          </Grid.Column>
          <Image
            src="../static/ether2.png"
            width="216"
            height="256"
            style={{ paddingTop: '50px' }}
            alt="Ethereum"
          />

          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Decentralized
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Decentralized technology gives you the <br /> power to store your
              assets in a network.
            </p>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Immutable
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Keeps its ledgers in a never-ending <br /> state of forwarding
              momentum.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment
      inverted
      vertical
      style={{ padding: '5em 0em', backgroundColor: '#627eea' }}
    >
      <Container>
        <Header
          as="h3"
          style={{ fontSize: '2em', color: 'white', textAlign: 'center' }}
        >
          A fascinating quote
        </Header>
        <p
          style={{
            fontSize: '1.33em',
            textAlign: 'center',
            fontStyle: 'Italic',
          }}
        >
          &quot;We have elected to put our money and faith in a mathematical
          framework that is free of politics and human error.&quot;
        </p>
        <Header
          as="h2"
          style={{ fontSize: '1.33em', color: 'white', textAlign: 'center' }}
        >
          Tyler Winklevoss
        </Header>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default HomePage
