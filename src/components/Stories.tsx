import { stories } from "@/lib/data";

export default function Stories() {
  return (
    <section className="section section--alt" id="stories">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">Receipts</span>
          <h2 className="h-sec">
            People who <em>actually did it</em>.
          </h2>
          <p className="sec-sub">
            Not influencers. Not a brochure. Real names, real US states, real
            numbers.
          </p>
        </div>
        <div className="stories">
          {stories.map((s, i) => (
            <figure className="story" key={i}>
              <div className="story__mark">&ldquo;</div>
              <blockquote className="story__quote">{s.quote}</blockquote>
              <figcaption className="story__who">
                <span className="story__avatar" aria-hidden="true">
                  {s.name[0]}
                </span>
                <span>
                  <span className="story__name">
                    {s.name}, {s.age}
                  </span>
                  <br />
                  <span className="story__loc">{s.place}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
