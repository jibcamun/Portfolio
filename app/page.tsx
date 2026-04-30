import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Jibran Noorshah
      </h1>
      <p className="mb-4">
        {`I'm Jibran Noorshah, a tech enthusiast and developer, finding unmatched glory in
        reading research papers and getting lost in a pile of math problems.
        My newfound interest in pursuing AI/ML research and my nascent knowledge of 3D modelling and PCB design
        has led me to explore the intersection of software and hardware, and I'm excited to see where this journey takes me.
        And when I'm not doing any of that, you can find me reading psychology, playing minecraft, or just hanging out with friends.
        `}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
