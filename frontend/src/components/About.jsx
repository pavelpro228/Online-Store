import React from "react";
import "./styles/About.css";
import ImageStore1 from "./images/image-store1.jpg";
import ImageStore2 from "./images/image-store2.jpg";
import ImageStore3 from "./images/image-store3.jpg";
import ImageStore4 from "./images/image-store4.jpg";

const About = () => (
  <section className="content">
    <div className="text-about">
      <p>
          Цей сайт допоможе вам знайти правильний комп’ютер для вас.
          Наприклад, для відеоігор або інших важких програм.<br/>
          Працівники дуже грамотно ставляться до побажань клієнта 
          допомогти підібрати товар відповідно до бажаних вимог.
      </p>
    </div>

    <div className="images-about">
      <img src={ImageStore1} alt="Store interior 1" />
      <img src={ImageStore2} alt="Store interior 2" />
      <img src={ImageStore3} alt="Store interior 3" />
      <img src={ImageStore4} alt="Store interior 4" />
    </div>
  </section>
);

export default About;
