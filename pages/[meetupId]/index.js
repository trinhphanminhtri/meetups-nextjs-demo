import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = ({ meetupData }) => {
  return (
    <Fragment>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="desription" content={meetupData.description}/>
      </Head>
      <MeetupDetail
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
      {/* <MeetupDetail
      image="https://i.pinimg.com/564x/7c/52/cd/7c52cdf4185f0f39f44665c8cdc0f466.jpg"
      title="A First Meetup"
      address="Some address 123"
      description="This is a first meetup!"
      /> */}
    </Fragment>
  );
};

export default MeetupDetails;

export async function getStaticPaths() {
  // fetching data
  const client = await MongoClient.connect(
    "mongodb+srv://meetups:lIeXr1vW9j9JlZuF@cluster0.lnx561r.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    // [{ params: { meetupId: "m1" } }, { params: { meetupId: "m2" } }],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  // fetching data for a single meetup
  const client = await MongoClient.connect(
    "mongodb+srv://meetups:lIeXr1vW9j9JlZuF@cluster0.lnx561r.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
      },
      // meetupData: {
      //   image:
      //     "https://i.pinimg.com/564x/7c/52/cd/7c52cdf4185f0f39f44665c8cdc0f466.jpg",
      //   id: meetupId,
      //   title: "A First Meetup",
      //   address: "Some address 123",
      //   description: "This is a first meetup!",
      // },
    },
  };
}
