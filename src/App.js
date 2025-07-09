{\rtf1\ansi\ansicpg1252\cocoartf2818
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import React, \{ useState \} from 'react';\
import \{ ChevronRight, Home, MapPin, Phone, ArrowLeft, CheckCircle \} from 'lucide-react';\
\
const ElderCareDecisionApp = () => \{\
  const [currentQuestion, setCurrentQuestion] = useState(0);\
  const [answers, setAnswers] = useState(\{\});\
  const [showResult, setShowResult] = useState(false);\
\
  const questions = [\
    \{\
      id: 'livingSpace',\
      question: 'Do you have adequate space in your current home to accommodate your loved one?',\
      type: 'multiple',\
      options: [\
        \{ value: 'yes_extra_room', text: 'Yes, I have an extra room/space that could be converted', points: \{ home: 3, move: 1, distance: 0 \} \},\
        \{ value: 'yes_modifications', text: 'Yes, but would need modifications (accessibility, safety)', points: \{ home: 2, move: 1, distance: 1 \} \},\
        \{ value: 'tight_fit', text: 'It would be tight, but manageable', points: \{ home: 1, move: 2, distance: 1 \} \},\
        \{ value: 'no_space', text: 'No, my current home lacks adequate space', points: \{ home: 0, move: 2, distance: 3 \} \}\
      ]\
    \},\
    \{\
      id: 'careLevel',\
      question: 'What level of care does your loved one currently need?',\
      type: 'multiple',\
      options: [\
        \{ value: 'minimal', text: 'Minimal - mostly companionship and light assistance', points: \{ home: 2, move: 2, distance: 3 \} \},\
        \{ value: 'moderate', text: 'Moderate - help with daily activities, medication management', points: \{ home: 3, move: 2, distance: 1 \} \},\
        \{ value: 'significant', text: 'Significant - frequent medical appointments, mobility assistance', points: \{ home: 2, move: 3, distance: 1 \} \},\
        \{ value: 'intensive', text: 'Intensive - constant supervision or specialized medical care', points: \{ home: 1, move: 1, distance: 0 \} \}\
      ]\
    \},\
    \{\
      id: 'businessFlexibility',\
      question: 'How flexible is your business in terms of location and remote work?',\
      type: 'multiple',\
      options: [\
        \{ value: 'fully_remote', text: 'Fully remote/location independent', points: \{ home: 2, move: 3, distance: 2 \} \},\
        \{ value: 'mostly_remote', text: 'Mostly remote with occasional travel', points: \{ home: 2, move: 3, distance: 2 \} \},\
        \{ value: 'hybrid', text: 'Hybrid - requires some local presence', points: \{ home: 2, move: 2, distance: 2 \} \},\
        \{ value: 'location_dependent', text: 'Highly location-dependent (retail, service, local clients)', points: \{ home: 3, move: 1, distance: 2 \} \}\
      ]\
    \},\
    \{\
      id: 'financialSituation',\
      question: 'What is your current financial situation regarding caregiving costs?',\
      type: 'multiple',\
      options: [\
        \{ value: 'comfortable', text: 'Comfortable - can afford professional care services', points: \{ home: 2, move: 2, distance: 3 \} \},\
        \{ value: 'manageable', text: 'Manageable - some professional help but need to be selective', points: \{ home: 2, move: 2, distance: 2 \} \},\
        \{ value: 'tight', text: 'Tight budget - professional care would be a significant strain', points: \{ home: 3, move: 2, distance: 1 \} \},\
        \{ value: 'limited', text: 'Very limited - would need to provide most care personally', points: \{ home: 3, move: 1, distance: 0 \} \}\
      ]\
    \},\
    \{\
      id: 'familySupport',\
      question: 'What family support system is available in your loved one\\'s current location?',\
      type: 'multiple',\
      options: [\
        \{ value: 'strong_local', text: 'Strong local support network (siblings, friends, community)', points: \{ home: 0, move: 3, distance: 3 \} \},\
        \{ value: 'some_local', text: 'Some local support but not comprehensive', points: \{ home: 1, move: 2, distance: 2 \} \},\
        \{ value: 'minimal_local', text: 'Minimal local support', points: \{ home: 2, move: 2, distance: 1 \} \},\
        \{ value: 'no_local', text: 'No meaningful local support system', points: \{ home: 3, move: 1, distance: 0 \} \}\
      ]\
    \},\
    \{\
      id: 'timeline',\
      question: 'What is your timeline for making this caregiving decision?',\
      type: 'multiple',\
      options: [\
        \{ value: 'immediate', text: 'Immediate - situation is urgent', points: \{ home: 3, move: 0, distance: 2 \} \},\
        \{ value: 'few_months', text: 'Within a few months', points: \{ home: 2, move: 1, distance: 3 \} \},\
        \{ value: 'six_months', text: '6-12 months to plan', points: \{ home: 2, move: 3, distance: 2 \} \},\
        \{ value: 'year_plus', text: 'A year or more to prepare', points: \{ home: 1, move: 3, distance: 2 \} \}\
      ]\
    \},\
    \{\
      id: 'personalWellbeing',\
      question: 'How would providing hands-on daily care affect your personal well-being and work performance?',\
      type: 'multiple',\
      options: [\
        \{ value: 'manageable', text: 'I feel prepared and capable of managing both', points: \{ home: 3, move: 2, distance: 1 \} \},\
        \{ value: 'challenging', text: 'It would be challenging but doable with support', points: \{ home: 2, move: 2, distance: 2 \} \},\
        \{ value: 'overwhelming', text: 'It would likely be overwhelming and affect my work', points: \{ home: 1, move: 1, distance: 3 \} \},\
        \{ value: 'impossible', text: 'It would be nearly impossible to maintain both effectively', points: \{ home: 0, move: 1, distance: 3 \} \}\
      ]\
    \},\
    \{\
      id: 'lovedOnePreference',\
      question: 'What is your loved one\\'s preference regarding their living situation?',\
      type: 'multiple',\
      options: [\
        \{ value: 'stay_home', text: 'Strongly prefers to stay in their current home', points: \{ home: 0, move: 2, distance: 3 \} \},\
        \{ value: 'family_close', text: 'Wants to be close to family but flexible about location', points: \{ home: 2, move: 3, distance: 1 \} \},\
        \{ value: 'move_family', text: 'Open to moving in with family', points: \{ home: 3, move: 1, distance: 0 \} \},\
        \{ value: 'professional_care', text: 'Prefers professional care with family oversight', points: \{ home: 1, move: 2, distance: 3 \} \}\
      ]\
    \}\
  ];\
\
  const handleAnswer = (questionId, answer) => \{\
    setAnswers(\{ ...answers, [questionId]: answer \});\
    \
    if (currentQuestion < questions.length - 1) \{\
      setCurrentQuestion(currentQuestion + 1);\
    \} else \{\
      calculateResult();\
    \}\
  \};\
\
  const calculateResult = () => \{\
    const scores = \{ home: 0, move: 0, distance: 0 \};\
    \
    Object.values(answers).forEach(answer => \{\
      scores.home += answer.points.home;\
      scores.move += answer.points.move;\
      scores.distance += answer.points.distance;\
    \});\
    \
    setShowResult(\{ scores, recommendation: getRecommendation(scores) \});\
  \};\
\
  const getRecommendation = (scores) => \{\
    const maxScore = Math.max(scores.home, scores.move, scores.distance);\
    \
    if (scores.home === maxScore) return 'home';\
    if (scores.move === maxScore) return 'move';\
    return 'distance';\
  \};\
\
  const resetQuiz = () => \{\
    setCurrentQuestion(0);\
    setAnswers(\{\});\
    setShowResult(false);\
  \};\
\
  const goBack = () => \{\
    if (currentQuestion > 0) \{\
      setCurrentQuestion(currentQuestion - 1);\
    \}\
  \};\
\
  const getRecommendationDetails = (recommendation, scores) => \{\
    const details = \{\
      home: \{\
        title: 'Bring Them Home With You',\
        icon: <Home className="w-8 h-8 text-blue-600" />,\
        description: 'Based on your answers, bringing your loved one to live with you appears to be the best option.',\
        benefits: [\
          'Direct oversight and immediate response to needs',\
          'Potentially lower costs than professional care',\
          'Stronger family bonds and emotional support',\
          'Complete control over care quality and environment'\
        ],\
        considerations: [\
          'Ensure your home has adequate accessibility features',\
          'Plan for respite care to prevent caregiver burnout',\
          'Consider how this affects other family members',\
          'Prepare for the emotional and physical demands'\
        ]\
      \},\
      move: \{\
        title: 'Move Your Business Near Them',\
        icon: <MapPin className="w-8 h-8 text-green-600" />,\
        description: 'Relocating your business to be closer to your loved one seems to be the optimal solution.',\
        benefits: [\
          'Maintain your loved one\\'s familiar environment and community',\
          'Preserve their independence while being nearby',\
          'Access to their existing support network',\
          'Flexibility to provide hands-on care when needed'\
        ],\
        considerations: [\
          'Research business opportunities in the new location',\
          'Plan the business transition carefully',\
          'Consider the impact on your current clients/customers',\
          'Evaluate cost of living and business costs in new area'\
        ]\
      \},\
      distance: \{\
        title: 'Manage Their Care From A Distance',\
        icon: <Phone className="w-8 h-8 text-purple-600" />,\
        description: 'Coordinating professional care while maintaining your current location appears to be the most suitable approach.',\
        benefits: [\
          'Maintain business stability and continuity',\
          'Access to professional caregiving expertise',\
          'Preserve your loved one\\'s independence',\
          'Sustainable long-term solution'\
        ],\
        considerations: [\
          'Research and vet professional care services thoroughly',\
          'Set up regular check-ins and monitoring systems',\
          'Plan for periodic visits and emergency situations',\
          'Consider technology solutions for remote monitoring'\
        ]\
      \}\
    \};\
    \
    return details[recommendation];\
  \};\
\
  if (showResult) \{\
    const details = getRecommendationDetails(showResult.recommendation, showResult.scores);\
    \
    return (\
      <div className="max-w-4xl mx-auto p-6 bg-white">\
        <div className="text-center mb-8">\
          <div className="flex justify-center mb-4">\
            \{details.icon\}\
          </div>\
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Recommended Path</h1>\
          <h2 className="text-2xl font-semibold text-gray-700">\{details.title\}</h2>\
          <p className="text-gray-600 mt-4 text-lg">\{details.description\}</p>\
        </div>\
\
        <div className="grid md:grid-cols-2 gap-8 mb-8">\
          <div className="bg-green-50 p-6 rounded-lg">\
            <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">\
              <CheckCircle className="w-5 h-5 mr-2" />\
              Key Benefits\
            </h3>\
            <ul className="space-y-2">\
              \{details.benefits.map((benefit, index) => (\
                <li key=\{index\} className="text-green-700 flex items-start">\
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>\
                  \{benefit\}\
                </li>\
              ))\}\
            </ul>\
          </div>\
\
          <div className="bg-amber-50 p-6 rounded-lg">\
            <h3 className="text-xl font-semibold text-amber-800 mb-4">Important Considerations</h3>\
            <ul className="space-y-2">\
              \{details.considerations.map((consideration, index) => (\
                <li key=\{index\} className="text-amber-700 flex items-start">\
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>\
                  \{consideration\}\
                </li>\
              ))\}\
            </ul>\
          </div>\
        </div>\
\
        <div className="bg-gray-100 p-6 rounded-lg mb-8">\
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Scores Breakdown</h3>\
          <div className="grid grid-cols-3 gap-4">\
            <div className="text-center">\
              <div className="text-2xl font-bold text-blue-600">\{showResult.scores.home\}</div>\
              <div className="text-sm text-gray-600">Bring Home</div>\
            </div>\
            <div className="text-center">\
              <div className="text-2xl font-bold text-green-600">\{showResult.scores.move\}</div>\
              <div className="text-sm text-gray-600">Move Business</div>\
            </div>\
            <div className="text-center">\
              <div className="text-2xl font-bold text-purple-600">\{showResult.scores.distance\}</div>\
              <div className="text-sm text-gray-600">Manage Distance</div>\
            </div>\
          </div>\
        </div>\
\
        <div className="text-center">\
          <button\
            onClick=\{resetQuiz\}\
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"\
          >\
            Take Assessment Again\
          </button>\
        </div>\
\
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">\
          <p className="text-sm text-blue-800">\
            <strong>Important Note:</strong> This assessment provides guidance based on your responses, but every situation is unique. \
            Consider consulting with elder care professionals, family members, and your loved one to make the best decision for your specific circumstances.\
          </p>\
        </div>\
      </div>\
    );\
  \}\
\
  const question = questions[currentQuestion];\
  const progress = ((currentQuestion + 1) / questions.length) * 100;\
\
  return (\
    <div className="max-w-3xl mx-auto p-6 bg-white min-h-screen">\
      <div className="mb-8">\
        <div className="flex items-center justify-between mb-4">\
          <h1 className="text-2xl font-bold text-gray-800">Elder Care Decision Navigator</h1>\
          <span className="text-sm text-gray-600">\
            \{currentQuestion + 1\} of \{questions.length\}\
          </span>\
        </div>\
        \
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">\
          <div \
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"\
            style=\{\{ width: `$\{progress\}%` \}\}\
          ></div>\
        </div>\
      </div>\
\
      <div className="bg-gray-50 p-8 rounded-lg mb-6">\
        <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">\
          \{question.question\}\
        </h2>\
\
        <div className="space-y-3">\
          \{question.options.map((option, index) => (\
            <button\
              key=\{index\}\
              onClick=\{() => handleAnswer(question.id, option)\}\
              className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"\
            >\
              <div className="flex items-center justify-between">\
                <span className="text-gray-700 group-hover:text-blue-700">\
                  \{option.text\}\
                </span>\
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />\
              </div>\
            </button>\
          ))\}\
        </div>\
      </div>\
\
      \{currentQuestion > 0 && (\
        <div className="flex justify-between items-center">\
          <button\
            onClick=\{goBack\}\
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"\
          >\
            <ArrowLeft className="w-4 h-4 mr-2" />\
            Go Back\
          </button>\
        </div>\
      )\}\
\
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">\
        <p className="text-sm text-gray-700">\
          This assessment will help you evaluate three main approaches to elder care: bringing your loved one home with you, \
          moving your business to be near them, or managing their care from a distance. Answer honestly based on your current situation.\
        </p>\
      </div>\
    </div>\
  );\
\};\
\
export default ElderCareDecisionApp;}