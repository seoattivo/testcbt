import React, { useState } from 'react';
import { ChevronRight, Brain, Heart, Lightbulb, ArrowLeft, CheckCircle, Star, Sparkles } from 'lucide-react';

const CBTPsychologyApp = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'mood_frequency',
      text: 'Negli ultimi due mesi, quanto spesso ti sei sentito/a giù di morale, depresso/a o senza speranza?',
      options: [
        { value: 0, text: 'Mai', color: 'from-green-400 to-emerald-500' },
        { value: 1, text: 'Raramente', color: 'from-yellow-400 to-orange-400' },
        { value: 2, text: 'Spesso', color: 'from-orange-400 to-red-400' },
        { value: 3, text: 'Quasi sempre', color: 'from-red-500 to-pink-500' }
      ]
    },
    {
      id: 'anxiety_level',
      text: 'Come descriveresti il tuo livello generale di ansia o preoccupazione?',
      options: [
        { value: 0, text: 'Molto basso', color: 'from-blue-400 to-cyan-500' },
        { value: 1, text: 'Moderato', color: 'from-purple-400 to-indigo-500' },
        { value: 2, text: 'Alto', color: 'from-pink-400 to-rose-500' },
        { value: 3, text: 'Estremamente alto', color: 'from-red-500 to-pink-600' }
      ]
    },
    {
      id: 'negative_thoughts',
      text: 'Quanto spesso hai pensieri negativi su te stesso/a?',
      options: [
        { value: 0, text: 'Raramente o mai', color: 'from-emerald-400 to-teal-500' },
        { value: 1, text: 'Qualche volta', color: 'from-amber-400 to-yellow-500' },
        { value: 2, text: 'Frequentemente', color: 'from-orange-500 to-red-400' },
        { value: 3, text: 'Costantemente', color: 'from-red-600 to-pink-600' }
      ]
    },
    {
      id: 'coping_strategies',
      text: 'Come gestisci tipicamente lo stress e le difficoltà?',
      options: [
        { value: 0, text: 'Ho strategie efficaci', color: 'from-green-500 to-emerald-600' },
        { value: 1, text: 'Qualche strategia funziona', color: 'from-blue-400 to-indigo-500' },
        { value: 2, text: 'Faccio fatica a gestirli', color: 'from-yellow-500 to-orange-500' },
        { value: 3, text: 'Mi sento sopraffatto/a', color: 'from-red-500 to-pink-600' }
      ]
    },
    {
      id: 'social_relationships',
      text: 'Come valuti la qualità delle tue relazioni interpersonali?',
      options: [
        { value: 0, text: 'Molto soddisfacenti', color: 'from-pink-400 to-rose-500' },
        { value: 1, text: 'Generalmente buone', color: 'from-purple-400 to-indigo-500' },
        { value: 2, text: 'Potrebbero migliorare', color: 'from-orange-400 to-amber-500' },
        { value: 3, text: 'Spesso problematiche', color: 'from-red-500 to-pink-600' }
      ]
    },
    {
      id: 'life_satisfaction',
      text: 'Quanto sei soddisfatto/a della tua vita in generale?',
      options: [
        { value: 0, text: 'Molto soddisfatto/a', color: 'from-green-400 to-emerald-500' },
        { value: 1, text: 'Abbastanza soddisfatto/a', color: 'from-blue-400 to-cyan-500' },
        { value: 2, text: 'Poco soddisfatto/a', color: 'from-yellow-500 to-orange-500' },
        { value: 3, text: 'Per niente soddisfatto/a', color: 'from-red-500 to-pink-600' }
      ]
    },
    {
      id: 'behavioral_patterns',
      text: 'Hai notato comportamenti che ti limitano o ti creano problemi?',
      options: [
        { value: 0, text: 'No, raramente', color: 'from-teal-400 to-cyan-500' },
        { value: 1, text: 'Qualche volta', color: 'from-indigo-400 to-purple-500' },
        { value: 2, text: 'Spesso', color: 'from-orange-500 to-red-400' },
        { value: 3, text: 'Molto frequentemente', color: 'from-red-600 to-pink-600' }
      ]
    },
    {
      id: 'motivation_level',
      text: 'Come descriveresti il tuo livello di motivazione e energia?',
      options: [
        { value: 0, text: 'Alto e costante', color: 'from-yellow-400 to-orange-400' },
        { value: 1, text: 'Generalmente buono', color: 'from-green-400 to-teal-500' },
        { value: 2, text: 'Alti e bassi frequenti', color: 'from-purple-400 to-pink-500' },
        { value: 3, text: 'Spesso basso', color: 'from-gray-500 to-slate-600' }
      ]
    }
  ];

  const calculateProfile = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const maxScore = questions.length * 3;
    const percentage = (totalScore / maxScore) * 100;

    if (percentage <= 25) {
      return {
        type: 'Benessere Equilibrato',
        description: 'Il tuo profilo suggerisce un buon equilibrio emotivo e psicologico generale.',
        color: 'from-green-400 via-emerald-500 to-teal-600',
        icon: '🌟',
        riskLevel: 'basso',
        therapyReasons: [
          'Prevenzione e mantenimento del benessere',
          'Sviluppo di ulteriori strategie di coping',
          'Crescita personale e auto-consapevolezza'
        ],
        benefits: [
          'Maggiore resilienza emotiva',
          'Migliori capacità comunicative',
          'Prevenzione di future difficoltà'
        ]
      };
    } else if (percentage <= 50) {
      return {
        type: 'Stress Moderato',
        description: 'Mostri alcuni segni di stress e potrebbero esserci aree da migliorare nel tuo benessere.',
        color: 'from-yellow-400 via-orange-500 to-amber-600',
        icon: '⚡',
        riskLevel: 'moderato',
        therapyReasons: [
          'Gestione più efficace dello stress',
          'Miglioramento delle strategie di coping',
          'Prevenzione di un peggioramento'
        ],
        benefits: [
          'Riduzione significativa dello stress',
          'Migliore qualità della vita',
          'Maggiore controllo emotivo'
        ]
      };
    } else if (percentage <= 75) {
      return {
        type: 'Disagio Significativo',
        description: 'Il tuo profilo indica un livello significativo di disagio emotivo che potrebbe beneficiare di supporto.',
        color: 'from-orange-500 via-red-500 to-pink-600',
        icon: '🔥',
        riskLevel: 'alto',
        therapyReasons: [
          'Riduzione del disagio emotivo',
          'Sviluppo di strategie di coping efficaci',
          'Miglioramento della qualità di vita'
        ],
        benefits: [
          'Significativa riduzione dei sintomi',
          'Migliori relazioni interpersonali',
          'Maggiore soddisfazione personale'
        ]
      };
    } else {
      return {
        type: 'Supporto Urgente',
        description: 'Il tuo profilo suggerisce un livello elevato di disagio che richiederebbe attenzione professionale.',
        color: 'from-red-600 via-pink-600 to-purple-700',
        icon: '🆘',
        riskLevel: 'molto alto',
        therapyReasons: [
          'Gestione immediata del disagio acuto',
          'Sviluppo di strategie di sicurezza',
          'Supporto professionale continuativo'
        ],
        benefits: [
          'Riduzione drastica dei sintomi',
          'Miglioramento della stabilità emotiva',
          'Recupero del controllo sulla propria vita'
        ]
      };
    }
  };

  const handleTransition = (callback) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, 300);
  };

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentQuestionIndex < questions.length - 1) {
      handleTransition(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      });
    } else {
      handleTransition(() => {
        setShowResults(true);
      });
    }
  };

  const resetTest = () => {
    handleTransition(() => {
      setCurrentStep('welcome');
      setCurrentQuestionIndex(0);
      setAnswers({});
      setShowResults(false);
    });
  };

  const currentQuestion = questions[currentQuestionIndex];
  const profile = showResults ? calculateProfile() : null;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-r from-cyan-400/20 to-purple-600/20 animate-pulse"></div>
        </div>
        
        <div className={`max-w-lg w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 transform transition-all duration-700 ${isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-yellow-800" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                Profilo Psicologico
              </h1>
              <p className="text-lg text-white/80 leading-relaxed">
                Scopri il tuo benessere emotivo attraverso un'analisi basata sui principi della <span className="font-semibold text-cyan-300">Terapia Cognitivo-Comportamentale</span>
              </p>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-center space-x-4 text-white/70 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>8 domande</span>
                </div>
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>3 minuti</span>
                </div>
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Risultati istantanei</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => handleTransition(() => setCurrentStep('questions'))}
              className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl hover:from-cyan-400 hover:via-blue-500 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
            >
              <span>Inizia la Valutazione</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <p className="text-xs text-white/50 leading-relaxed">
              Questo test è solo a scopo informativo e non sostituisce una valutazione professionale
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'questions' && !showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-r from-blue-400/20 to-purple-600/20"></div>
        </div>
        
        <div className={`max-w-2xl w-full transform transition-all duration-500 ${isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white/80 font-medium">Progresso</span>
              <span className="text-white/80 font-medium">{currentQuestionIndex + 1} di {questions.length}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 backdrop-blur-sm">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-700 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">{currentQuestionIndex + 1}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4 leading-relaxed">
                {currentQuestion.text}
              </h2>
            </div>
            
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className={`w-full p-6 rounded-2xl border-2 border-transparent bg-gradient-to-r ${option.color} hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl group text-left`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-lg group-hover:text-white transition-colors duration-300">
                      {option.text}
                    </span>
                    <ChevronRight className="w-6 h-6 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </button>
              ))}
            </div>
            
            {currentQuestionIndex > 0 && (
              <button
                onClick={() => handleTransition(() => setCurrentQuestionIndex(prev => prev - 1))}
                className="mt-6 flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Domanda precedente</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (showResults && profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 py-8 px-4">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-r from-purple-400/20 to-pink-600/20"></div>
        </div>
        
        <div className={`max-w-4xl mx-auto transform transition-all duration-700 ${isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full flex items-center justify-center mb-6 shadow-2xl">
              <span className="text-4xl">{profile.icon}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              I Tuoi Risultati
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${profile.color} text-white font-bold text-xl shadow-lg mb-4`}>
                {profile.type}
              </div>
              <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                {profile.description}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Perché la Psicoterapia</h3>
              </div>
              <div className="space-y-4">
                {profile.therapyReasons.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 leading-relaxed">{reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Vantaggi Attesi</h3>
              </div>
              <div className="space-y-4">
                {profile.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Approccio Cognitivo-Comportamentale (CBT)
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Pensieri</h4>
                <p className="text-white/80 text-sm">Identificare e modificare i pattern di pensiero negativi</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Emozioni</h4>
                <p className="text-white/80 text-sm">Gestire e regolare le reazioni emotive</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Comportamenti</h4>
                <p className="text-white/80 text-sm">Sviluppare strategie comportamentali efficaci</p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/20">
              <p className="text-white/90 text-lg mb-4">
                <span className="font-semibold">Importante:</span> Questo test fornisce solo indicazioni generali. Per una valutazione completa e professionale, consulta sempre uno psicologo o psicoterapeuta qualificato.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetTest}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold rounded-2xl hover:from-indigo-500 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Ripeti il Test
              </button>
              <button
                onClick={() => window.print()}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl hover:bg-white/20 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
              >
                Salva Risultati
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CBTPsychologyApp;