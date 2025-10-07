import { ArrowRight, CheckCircle, Zap, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import FlowDiagram from '../components/FlowDiagram';

export default function Home() {
  const features = [
    {
      icon: Target,
      title: 'Personalized Roadmap',
      description: 'Answer a few questions and get a custom 7-step cold email system plan'
    },
    {
      icon: Zap,
      title: 'Template Generator',
      description: 'Choose a proven framework and generate ready-to-use email templates'
    },
    {
      icon: CheckCircle,
      title: 'Free Tools Stack',
      description: 'Discover the best free tools for every stage of your cold email system'
    },
    {
      icon: TrendingUp,
      title: 'AI Assistant',
      description: 'Get expert advice on strategy, copywriting, and optimization'
    }
  ];

  const stats = [
    { label: 'Email Templates', value: '15+' },
    { label: 'Free Tools', value: '30+' },
    { label: 'Success Rate', value: '3-10%' },
    { label: 'Avg. Setup Time', value: '2-3 days' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Build Your Cold Email System
            <span className="block text-blue-600 mt-2">Using Free Tools</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A complete step-by-step platform for freelancers, founders, and agencies
            to plan, build, and automate their cold email outreach.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/setup"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>Start Setup Wizard</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/assistant"
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              Talk to AI Assistant
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="mb-16">
          <FlowDiagram />
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Everything You Need to Succeed
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} hover>
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Getting Replies?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join hundreds of freelancers and founders who built profitable cold email
              systems without spending thousands on expensive tools.
            </p>
            <Link
              to="/setup"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
