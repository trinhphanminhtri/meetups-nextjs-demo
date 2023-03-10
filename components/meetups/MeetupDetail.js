import { Fragment } from "react";
import classes from "./MeetupDetail.module.css";

const MeetupDetail = (props) => {
  return (
    <Fragment>
      <section className={classes.detail}>
        <img src={props.image} alt={props.title} />
        <h1>A First Meetup</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </section>
    </Fragment>
  );
};

export default MeetupDetail;

