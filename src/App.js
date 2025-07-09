import React, { useState } from 'react';
import { ChevronRight, Home, MapPin, Phone, ArrowLeft, CheckCircle } from 'lucide-react';

const ElderCareDecisionApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 'livingSpace',
      question: 'Do you have adequate space in your current home to accommodate your loved one?',
      type: 'multiple',
      options: [
        { value: 'yes_extra_room', text: 'Yes, I have an extra room/space that could be converted', points: { home: 3, move: 1, distance: 0 } },
        { value: 'yes_modifications', text: 'Yes, but would need modifications (accessibility, safety)', points: { home: 2, move: 1, distance: 1 } },
        { value: 'tight_fit', text: 'It would be tight, but manageable', points: { home: 1, move: 2, distance: 1 } },
        { value: 'no_space', text: 'No, my current home lacks adequate space', points: { home: 0, move: 2, distance: 3 } }
      ]
    },
    {
      id: 'careLevel',
      question: 'What level of care does your loved one currently need?',
      type: 'multiple',
      options: [
        { value: 'minimal', text: 'Minimal - mostly companionship and light assistance', points: { home: 2, move: 2, distance: 3 } },
        { value: 'moderate', text: 'Moderate - help with daily activities, medication management', points: { home: 3, move: 2, distance: 1 } },
        { value: 'significant', text: 'Significant - frequent medical appointments, mobility assistance', points: { home: 2, move: 3, distance: 1 } },
        { value: 'intensive', text: 'Intensive - constant supervision or specialized medical care', points: { home: 1, move: 1, distance: 0 } }
      ]
    },
    {
      id: 'businessFlexibility',
      question: 'How flexible is your business in terms of location and remote work?',
      type: 'multiple',
      options: [
        { value: 'fully_remote', text: 'Fully remote/location independent', points: { home: 2, move: 3, distance: 2 } },
        { value: 'mostly_remote', text: 'Mostly remote with occasional travel', points: { home: 2, move: 3, distance: 2 } },
        { value: 'hybrid', text: 'Hybrid - requires some local presence', points: { home: 2, move: 2, distance: 2 } },
        { value: 'location_dependent', text: 'Highly location-dependent (retail, service, local clients)', points: { home: 3, move: 1, distance: 2 } }
      ]
    },
    {
      id: 'financialSituation',
      question: 'What is your current financial situation regarding caregiving costs?',
      type: 'multiple',
      options: [
        { value: 'comfortable', text: 'Comfortable - can afford professional care services', points: { home: 2, move: 2, distance: 3 } },
        { value: 'manageable', text: 'Manageable - some professional help but need to be selective', points: { home: 2, move: 2, distance: 2 } },
        { value: 'tight', text: 'Tight budget - professional care would be a significant strain', points: { home: 3, move: 2, distance: 1 } },
        { value: 'limited', text: 'Very limited - would need to provide most care personally', points: { home: 3, move: 1, distance: 0 } }
      ]
    },
    {
      id: 'familySupport',
      question: 'What family support system is available in your loved one\'s current location?',
      type: 'multiple',
      options: [
        { value: 'strong_local', text: 'Strong local support network (siblings, friends, community)', points: { home: 0, move: 3, distance: 3 } },
        { value: 'some_local', text: 'Some local support but not comprehensive', points: { home: 1, move: 2, distance: 2 } },
        { value: 'minimal_local', text: 'Minimal local support', points: { home: 2, move: 2, distance: 1 } },
        { value: 'no_local', text: 'No meaningful local support system', points: { home: 3, move: 1, distance: 0 } }
      ]
    },
    {
      id: 'timeline',
      question: 'What is your timeline for making this caregiving decision?',
      type: 'multiple',
      options: [
        { value: 'immediate', text: 'Immediate - situation is urgent', points: { home: 3, move: 0, distance: 2 } },
        { value: 'few_months', text: 'Within a few months', points: { home: 2, move: 1, distance: 3 } },
        { value: 'six_months', text: '6-12 months to plan', points: { home: 2, move: 3, distance: 2 } },
        { value: 'year_plus', text: 'A year or more to prepare', points: { home: 1, move: 3, distance: 2 } }
      ]
    },
    {
      id: 'personalWellbeing',
      question: 'How would providing hands-on daily care affect your personal well-being and work performance?',
      type: 'multiple',
      options: [
        { value: 'manageable', text: 'I feel prepared and capable of managing both', points: { home: 3, move: 2, distance: 1 } },
        { value: 'challenging', text: 'It would be challenging but doable with support', points: { home: 2, move: 2, distance: 2 } },
        { value: 'overwhelming', text: 'It would likely be overwhelming and affect my work', points: { home: 1, move: 1, distance: 3 } },
        { value: 'impossible', text: 'It would be nearly impossible to maintain both effectively', points: { home: 0, move: 1, distance: 3 } }
      ]
    },
    {
      id: 'lovedOnePreference',
      question: 'What is your loved one\'s preference regarding their living situation?',
      type: 'multiple',
      options: [
        { value: 'stay_home', text: 'Strongly prefers to stay in their current home', points: { home: 0, move: 2, distance: 3 } },
        { value: 'family_close', text: 'Wants to be close to family but flexible about location', points: { home: 2, move: 3, distance: 1 } },
        { value: 'move_family', text: 'Open to moving in with family', points: { home: 3, move: 1, distance: 0 } },
        { value: 'professional_care', text: 'Prefers professional care with family oversight', points: { home: 1, move: 2, distance: 3 } }
      ]
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const scores = { home: 0, move: 0, distance: 0 };
    
    Object.values(answers).forEach(answer => {
      scores.home += answer.points.home;
      scores.move += answer.points.move;
      scores.distance += answer.points.distance;
    });
    
    setShowResult({ scores, recommendation: getRecommendation(scores) });
  };

  const getRecommendation = (scores) => {
    const maxScore = Math.max(scores.home, scores.move, scores.distance);
    
    if (scores.home === maxScore) return 'home';
    if (scores.move === maxScore) return 'move';
    return 'distance';
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getRecommendationDetails = (recommendation, scores) => {
    const details = {
      home: {
        title: 'Bring Them Home With You',
        icon: <Home className="w-8 h-8 text-blue-600" />,
        description: 'Based on your answers, bringing your loved one to live with you appears to be the best option.'
