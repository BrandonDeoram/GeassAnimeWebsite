import React from "react";
import styles from "./Top.module.css";
import AnimePage from "../AnimePage/AnimePage";
import Button from "@mui/material/Button";
import { ArrowBack } from "@material-ui/icons";
export default function Top() {
  //get top anime data
  let topAnimeData = [
    {
      title: "Naruto",
      image:
        "https://i.kinja-img.com/gawker-media/image/upload/c8b7d39a00d62c26f4ec2f8fc9986cda.jpg",
      description:
        "Moments prior to Naruto Uzumakis birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox, attacked Konohagakure, the Hidden Leaf Village, and wreaked havoc. In order to put an end to the Kyuubis rampage, the leader of the village, the Fourth Hokage, sacrificed his life and sealed the monstrous beast inside the newborn Naruto Now, Naruto is a hyperactive and knuckle headed ninja still living in Konohagakure. Shunned because of the Kyuubi inside him, Naruto struggles to find his place in the village, while his burning desire to become the Hokage of Konohagakure leads him not only to some great new friends, but also some deadly foes",
    },
    {
      title: "Demon Slayer",
      image:
        "https://wallpapers.com/images/featured/vy37autfo82jvft7.jpg",
      description:
        "Ever since the death of his father, the burden of supporting the family has fallen upon Tanjirou Kamados shoulders. Though living impoverished on a remote mountain, the Kamado family are able to enjoy a relatively peaceful and happy life. One day, Tanjirou decides to go down to the local village to make a little money selling charcoal. On his way back, night falls, forcing Tanjirou to take shelter in the house of a strange man, who warns him of the existence of flesh-eating demons that lurk in the woods at night.When he finally arrives back home the next day, he is met with a horrifying sight—his whole family has been slaughtered. Worse still, the sole survivor is his sister Nezuko, who has been turned into a bloodthirsty demon. Consumed by rage and hatred, Tanjirou swears to avenge his family and stay by his only remaining sibling. Alongside the mysterious group calling themselves the Demon Slayer Corps, Tanjirou will do whatever it takes to slay the demons and protect the remnants of his beloved sisters humanity.",
    },
  ];
  return (
    <div className={styles.wrapper}>
      <Button
        onClick={() => window.history.back()}
        className={styles.backButton}
        sx={{
          color: "white",
          zIndex: "600",
        }}
      >
        <ArrowBack className={styles.buttonColor} />
      </Button>
      {topAnimeData.map((anime) => (
        <AnimePage key={anime.title} anime={anime}></AnimePage>
      ))}
    </div>
  );
}
