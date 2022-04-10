import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import whiteboardimg from "../../assests/whiteboard.PNG";
import vedioconf from "../../assests/vedioconf.png";
import share from "../../assests/share.jpg";
import conf from "../../assests/conf.PNG";
import stream from "../../assests/stream.PNG";
import course from "../../assests/course.PNG";
import sonuImg from "../../assests/sonu.jpeg";
import yogeshImg from "../../assests/yogesh.jpeg";
import amitImg from "../../assests/amit.jpeg";
import ankitImg from "../../assests/ankit.jpeg";

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

const documentData = JSON.parse(localStorage.getItem("user"));
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="GGV Virtual Classroom"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em",
      }}
    />
    <Header
      as="h2"
      content="Learn whatever you want without leaving home."
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
      }}
    />
    {documentData ? (
      <Link to="/class">
        <Button negative size="huge">
          Get Started
          <Icon name="right arrow" />
        </Button>
      </Link>
    ) : (
      <Link to="/login">
        <Button negative size="huge">
          Get Started
          <Icon name="right arrow" />
        </Button>
      </Link>
    )}
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    const documentData = JSON.parse(localStorage.getItem("user"));
    return (
      <Media greaterThan="mobile">
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" active>
                  Home
                </Menu.Item>

                <Menu.Item as="a">
                  <a href="#featuresSection">Features </a>
                </Menu.Item>
                <Menu.Item as="a">
                  <a href="#aboutSection">About Us</a>
                </Menu.Item>

                <Menu.Item position="right">
                  {documentData ? (
                    <></>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button as="a" inverted={!fixed}>
                          Log in
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button
                          as="a"
                          inverted={!fixed}
                          negative={fixed}
                          style={{ marginLeft: "0.5em" }}
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Media as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Features</Menu.Item>
            <Menu.Item as="a">About Us</Menu.Item>
            <Link to="/login">
              <Menu.Item as="a">Log in</Menu.Item>
            </Link>
            <Link to="/register">
              <Menu.Item as="a">Sign Up</Menu.Item>
            </Link>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 350, padding: "1em 0em" }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Link to="/login">
                      <Button as="a" inverted>
                        Log in
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                        Sign Up
                      </Button>
                    </Link>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width={8}>
          <Divider hidden={true}> </Divider>
          <Header as="h3" style={{ fontSize: "2em" }}>
            GGV Virtual Classroom
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            GGV Virtual Classroom is A collaborative web conferencing tool with
            an <span>online whiteboard</span>, <span>breakout rooms</span>, and{" "}
            <span>screen sharing</span>
            capabilities for teachers and tutors who want to conduct highly
            interactive live online teaching sessions
          </p>
        </Grid.Column>
        <Grid.Column floated="right" width={6}>
          <Image
            bordered
            rounded
            size="large"
            alt="closer.png"
            title="Logo Closer"
            src={process.env.PUBLIC_URL + "/closer.png"}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>

    <Container>
      <Divider
        as="h4"
        className="header"
        horizontal
        style={{ margin: "3em 0em", textTransform: "uppercase" }}
      >
        <a href="#" id="featuresSection">
          Main Features
        </a>
      </Divider>
      <div style={{ marginBottom: "10%" }}>
        <Grid>
          <Grid.Column width={4}>
            <Image src={whiteboardimg} />
          </Grid.Column>
          <Grid.Column width={9}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Online whiteboard
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Share with your participants various types of learning resources
              on the <span>whiteboard</span> and discuss them during your{" "}
              <span>live sessions</span>. Engage your participants in different
              collaborative activities using the tools for creating, editing and
              presenting learning content.
            </p>{" "}
          </Grid.Column>
        </Grid>
      </div>
      <div style={{ marginBottom: "10%" }}>
        <Grid>
          <Grid.Column width={9}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Video-conference
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              See and hear your up to 2 participants simultaneously and
              experience an interaction which is very similar to face-to-face
              training.
            </p>
          </Grid.Column>
          <Grid.Column width={3}>
            <Image src={vedioconf} />
          </Grid.Column>
        </Grid>
      </div>
      <div style={{ marginBottom: "10%" }}>
        <Grid>
          <Grid.Column width={4}>
            <Image src={share} />
          </Grid.Column>
          <Grid.Column width={9}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Screen-sharing
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Demonstrate additional software and multimedia applications by{" "}
              <span>sharing your screen </span> with the participants.
            </p>
          </Grid.Column>
        </Grid>
      </div>
      <div style={{ marginBottom: "10%" }}>
        <Grid>
          <Grid.Column width={9}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Recording
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Monitor the work of the tutors in your organisation, analyse your
              own performance or encourage your learner to revise the learning
              content by watching the past sessions’ interactive playback.
            </p>
          </Grid.Column>
          <Grid.Column width={3}>
            <Image src={conf} />
          </Grid.Column>
        </Grid>
      </div>
      <div style={{ marginBottom: "10%" }}>
        <Grid>
          <Grid.Column width={4}>
            <Image src={stream} />
          </Grid.Column>
          <Grid.Column width={9}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Post to the class stream
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Posts information or a question that you add to the class stream,
              Comment response to a post or comment, Reply response to a comment
              that mentions the person who made that comment, Mention classmates
              or teacher in your post and finally upload file in your post (PDF,
              Picture …).
            </p>
          </Grid.Column>
        </Grid>
      </div>
      <div style={{ marginBottom: "10%" }}>
        <Grid>
          <Grid.Column width={9}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Courses
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              You can add a new course to the <span>class</span>, also u can
              Modify/Delete/Display it.
            </p>
          </Grid.Column>
          <Grid.Column width={3}>
            <Image src={course} />
          </Grid.Column>
        </Grid>
      </div>
    </Container>

    <Divider
      as="h4"
      className="header"
      horizontal
      style={{ margin: "3em 0em", textTransform: "uppercase" }}
    >
      <a href="#" id="aboutSection">
        About us
      </a>
    </Divider>
    <Container>
      <Grid columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Image src={sonuImg} size="small" circular centered />
            <Header as="h2">Sonu Kumar</Header>

            <a href="mailto:sonu.patna0808@gmail.com" target="_blanc">
              sonu.patna0808@gmail.com
            </a>

            <h4 style={{ color: "gray" }}>Developer</h4>
            <p>
              3rd year B.Tech student, <strong>Information Technology </strong>
              specialty (Web and Internet Technologies)
            </p>
            <a href="https://www.facebook.com/sonukumar81800/" target="_blanc">
              <Icon name="facebook" color="blue" />
            </a>
            <a
              href="https://www.linkedin.com/in/sonukumar81800/"
              target="_blanc"
            >
              <Icon name="linkedin " color="blue" />
            </a>
            <a href="mailto:sonu.patna0808@gmail.com" target="_blanc">
              <Icon name="mail outline" color="red" />
            </a>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Image src={yogeshImg} size="small" circular centered />
            <Header as="h2">Yogesh Jangde</Header>
            <a href="mailto:jangdeyogi102@gmail.com" target="_blanc">
              jangdeyogi102@gmail.com
            </a>

            <h4 style={{ color: "gray" }}>Developer</h4>
            <p>
              3rd year B.Tech student, <strong>Information Technology </strong>
              specialty (Web and Internet Technologies)
            </p>
            <a
              href="https://www.facebook.com/yogesh.jangde.940/"
              target="_blanc"
            >
              <Icon name="facebook" color="blue" />
            </a>
            <a
              href="https://www.linkedin.com/in/yogesh-jangde-197722200/"
              target="_blanc"
            >
              <Icon name="linkedin " color="blue" />
            </a>
            <a href="mailto:jangdeyogi102@gmail.com" target="_blanc">
              <Icon name="mail outline" color="red" />
            </a>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Image src={ankitImg} size="small" circular centered />
            <Header as="h2">Ankit Singh</Header>
            <a href="mailto:ankitsinghsindram@gmail.com" target="_blanc">
              ankitsinghsindram@gmail.com
            </a>

            <h4 style={{ color: "gray" }}>Developer</h4>
            <p>
              3rd year B.Tech student, <strong>Information Technology </strong>
              specialty (Web and Internet Technologies)
            </p>
            <a href="https://www.facebook.com/omarjmai.jmai/" target="_blanc">
              <Icon name="facebook" color="blue" />
            </a>
            <a
              href="https://www.linkedin.com/in/jmai-omar-611b56206/"
              target="_blanc"
            >
              <Icon name="linkedin " color="blue" />
            </a>
            <a href="mailto:ankitsinghsindram@gmail.com" target="_blanc">
              <Icon name="mail outline" color="red" />
            </a>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Image src={amitImg} size="small" circular centered />
            <Header as="h2">Amit Kumar Dewangan</Header>
            <a href="mailto:amit.nitrr@gmail.com" target="_blanc">
              amit.nitrr@gmail.com
            </a>

            <h4 style={{ color: "gray" }}>Assistant Professor (Mentor)</h4>
            <p>
              Department of Information Technology Engineering SOS, Engineering
              and Technology. <br />
              <strong>Guru Ghasidas Vishwavidyalaya, Bilaspur (C.G.)</strong>
            </p>
            <a href="" target="_blanc">
              <Icon name="facebook" color="blue" />
            </a>
            <a href="" target="_blanc">
              <Icon name="linkedin " color="blue" />
            </a>
            <a href="mailto:amit.nitrr@gmail.com" target="_blanc">
              <Icon name="mail outline" color="red" />
            </a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>

    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Contact Us</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Meeting</List.Item>
                <List.Item as="a">Classroom</List.Item>
                <List.Item as="a">Recording</List.Item>
                <List.Item as="a">Screen sharing</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <p>
                © 2022-2023 <span>GGV Virtual Classroom</span> is Developed and
                operated by GGV B.Tech IT 2019-2023 Batch.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
