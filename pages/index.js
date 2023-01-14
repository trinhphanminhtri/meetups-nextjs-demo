import { Fragment, useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
defaultHead;
import Head from "next/head";
import { defaultHead } from "next/head";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://i.pinimg.com/564x/7c/52/cd/7c52cdf4185f0f39f44665c8cdc0f466.jpg",
    address: "Some address 123",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://i.pinimg.com/564x/c3/19/9d/c3199dc058f91489686d4af8b9224fb1.jpg",
    address: "Some address 456",
    description: "This is a second meetup!",
  },
  {
    id: "m3",
    title: "A Third Meetup",
    image:
      "https://i.pinimg.com/564x/cd/6b/14/cd6b14823e56ca62f32282712b49ddf9.jpg",
    address: "Some address 789",
    description: "This is a third meetup!",
  },
  {
    id: "m4",
    title: "A Fourth Meetup",
    image:
      "https://i.pinimg.com/564x/ad/b2/ca/adb2ca4373ebc331e609aa30eddc9caf.jpg",
    address: "Some address 876",
    description: "This is a fourth meetup!",
  },
  {
    id: "m5",
    title: "A Fifth Meetup",
    image:
      "https://i.pinimg.com/564x/b9/06/fa/b906fa534dc8d7cfb2288f9ec0332aaf.jpg",
    address: "Some address 345",
    description: "This is a fifth meetup!",
  },
];

const HomePage = (props) => {
  /** Khi sử dụng getStaticProps() để tạo ra page pre-rendering => sẽ không dùng đoạn code bên dưới:
  
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  useEffect(() => {
    // first send a http request and fetch data
    // simulating to fetch this data from a server as a DUMMY_MEETUPS
    setLoadedMeetups(DUMMY_MEETUPS);
  }, []);

  return <MeetupList meetups={loadedMeetups} />;
  */
  return (
    <Fragment>
      <Head>
        <title>Meetup</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export default HomePage;

/** NOT running during the build process but always on the server after deployment: 
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  // fetching data from an API

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}
*/
/** Running during the build process:*/

export async function getStaticProps() {
  // fetching data from an API or reading file system
  const client = await MongoClient.connect(
    "mongodb+srv://meetups:lIeXr1vW9j9JlZuF@cluster0.lnx561r.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db(); // to get hold of database

  // table meetups
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray(); // find() => get all meetups
  client.close();

  return {
    props: {
      // meetups: DUMMY_MEETUPS,
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
