import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Users,
  Star,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-12">
      <section className="text-center mb-20">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
          Empowering Women in the Workforce
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
          Join our platform to connect with tailored job opportunities, attend
          professional events, and grow your career in a supportive community
          designed for women.
        </p>
        <div className="flex justify-center space-x-6">
          <Link href="/women/dashboard" passHref>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <span>Join as a Woman</span>
            </Button>
          </Link>
          <Link href="/organization/dashboard" passHref>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
            >
              <span>Register Organization</span>
            </Button>
          </Link>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-4xl font-semibold text-gray-800 dark:text-white mb-10 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: Users,
              title: "Create Your Profile",
              description:
                "Sign up and showcase your skills, experience, and career aspirations to stand out to potential employers.",
            },
            {
              icon: Briefcase,
              title: "Explore Opportunities",
              description:
                "Browse through job listings tailored for women in various industries and find your perfect match.",
            },
            {
              icon: Calendar,
              title: "Attend Events",
              description:
                "Participate in workshops, seminars, and networking events to boost your career and expand your professional network.",
            },
          ].map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <item.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-4xl font-semibold text-gray-800 dark:text-white mb-10 text-center">
          Featured Job Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Stitching Work", "Boutique Management", "Bag Making"].map(
            (category) => (
              <Card
                key={category}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                    Explore opportunities in {category.toLowerCase()} and start
                    your career journey today.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      href={`/women/jobs?category=${category
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      passHref
                    >
                      <span className="flex items-center">
                        View Jobs <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-4xl font-semibold text-gray-800 dark:text-white mb-10 text-center">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              icon: Star,
              title: "Curated Opportunities",
              description:
                "We carefully select job listings and events that align with women's career goals and aspirations.",
            },
            {
              icon: Users,
              title: "Supportive Community",
              description:
                "Connect with like-minded women, share experiences, and grow together in your professional journey.",
            },
            {
              icon: Calendar,
              title: "Skill Development",
              description:
                "Access workshops and training sessions designed to enhance your skills and boost your career prospects.",
            },
            {
              icon: TrendingUp,
              title: "Career Growth",
              description:
                "Find mentorship opportunities and resources to help you climb the career ladder in your chosen field.",
            },
          ].map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <item.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-4xl font-semibold text-gray-800 dark:text-white mb-6">
          Ready to Take the Next Step?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
          Join our community of empowered women and supportive organizations
          today. Your dream career is just a click away!
        </p>
        <Button asChild size="lg" className="text-lg px-8 py-6">
          <Link href="/register">Get Started Now</Link>
        </Button>
      </section>
    </div>
  );
}
