import Image from 'next/image'
import { BlogPosts } from 'app/components/posts'
import { ProjectPosts } from 'app/components/projects'

export default function Page() {
  return (
    <section>
      <div className="mb-8 flex items-center gap-4">
        <Image
          src="/images/profile.jpeg"
          alt="Jibran Noorshah"
          width={88}
          height={88}
          priority
          className="h-[88px] w-[88px] rounded-full object-cover"
        />
        <h1 className="text-2xl font-semibold tracking-tighter">
          Jibran Noorshah
        </h1>
      </div>
      <p className="mb-4">
        {`I'm a tech enthusiast and developer who finds unmatched glory in
        reading research papers and getting lost in a pile of math problems.
        My newfound interest in pursuing AI/ML research and my nascent knowledge of 3D modelling and PCB design
        has led me to explore the intersection of software and hardware, and I'm excited to see where this journey takes me.
        And when I'm not doing any of that, you can find me reading psychology, playing minecraft, or just hanging out with friends.
        `}
      </p>
      <section className="my-8">
        <h2 className="mb-4 font-semibold tracking-tight">Recent Posts</h2>
        <BlogPosts limit={3} />
      </section>
      <section className="my-8">
        <h2 className="mb-4 font-semibold tracking-tight">
          Featured Projects
        </h2>
        <ProjectPosts featuredOnly />
      </section>
    </section>
  )
}
