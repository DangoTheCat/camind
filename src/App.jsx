import React, { useState } from 'react'
import OpeningSequence from './components/OpeningSequence'
import Wireframe2Destination from './components/Wireframe2Destination'
import BasicPhilosophyPage from './components/BasicPhilosophyPage'
import EnvironmentConditionPage from './components/EnvironmentConditionPage'
import InfluencePage from './components/InfluencePage'
import ConclusionPage from './components/ConclusionPage'

export default function App() {
  // URL tab query support for direct navigation
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const initialTab = urlParams?.get('tab') || null
  const initialScreen = initialTab === 'theory' ? 'theory'
    : initialTab === 'environment' || initialTab === 'history' ? 'environment'
    : initialTab === 'influence' ? 'influence'
    : initialTab === 'conclusion' ? 'conclusion'
    : initialTab === 'intro' ? 'wireframe2'
    : 'open'

  // Screen state: 'open' | 'wireframe2' | 'theory' | 'environment' | 'influence' | 'conclusion'
  const [currentScreen, setCurrentScreen] = useState(initialScreen)
  // Active nav tab: default null -> all 4 tabs render WHITE
  const [activeTab, setActiveTab] = useState(initialTab)
  // Active controller state: default false (white background, black icon)
  // When clicked: true (dark gold gradient #000000 -> #AD9000, white icon)
  const [isControllerActive, setIsControllerActive] = useState(false)

  const handleNavClick = (tabKey) => {
    setActiveTab(tabKey)
    if (tabKey === 'intro') {
      setCurrentScreen('wireframe2')
    } else if (tabKey === 'theory') {
      setCurrentScreen('theory')
    } else if (tabKey === 'history' || tabKey === 'environment') {
      setCurrentScreen('environment')
    } else if (tabKey === 'influence') {
      setCurrentScreen('influence')
    } else if (tabKey === 'conclusion') {
      setCurrentScreen('conclusion')
    }
  }

  const handleControllerClick = (nextState) => {
    setIsControllerActive(nextState)
  }

  const handleLogoClick = () => {
    setActiveTab(null)
    setCurrentScreen('open')
  }

  return (
    <div className="app-container">
      {currentScreen === 'open' ? (
        <OpeningSequence
          activeTab={activeTab}
          isControllerActive={isControllerActive}
          onNavClick={handleNavClick}
          onControllerClick={handleControllerClick}
          onLogoClick={handleLogoClick}
          onEnterWebsite={() => {
            setCurrentScreen('wireframe2')
            setActiveTab('intro')
          }}
        />
      ) : currentScreen === 'conclusion' || activeTab === 'conclusion' ? (
        <ConclusionPage
          activeTab={activeTab || 'conclusion'}
          isControllerActive={isControllerActive}
          onNavClick={handleNavClick}
          onControllerClick={handleControllerClick}
          onLogoClick={handleLogoClick}
        />
      ) : currentScreen === 'influence' || activeTab === 'influence' ? (
        <InfluencePage
          activeTab={activeTab || 'influence'}
          isControllerActive={isControllerActive}
          onNavClick={handleNavClick}
          onControllerClick={handleControllerClick}
          onLogoClick={handleLogoClick}
        />
      ) : currentScreen === 'environment' || activeTab === 'history' || activeTab === 'environment' ? (
        <EnvironmentConditionPage
          activeTab={activeTab || 'history'}
          isControllerActive={isControllerActive}
          onNavClick={handleNavClick}
          onControllerClick={handleControllerClick}
          onLogoClick={handleLogoClick}
        />
      ) : currentScreen === 'theory' || activeTab === 'theory' ? (
        <BasicPhilosophyPage
          activeTab={activeTab || 'theory'}
          isControllerActive={isControllerActive}
          onNavClick={handleNavClick}
          onControllerClick={handleControllerClick}
          onLogoClick={handleLogoClick}
        />
      ) : (
        <Wireframe2Destination
          activeTab={activeTab || 'intro'}
          isControllerActive={isControllerActive}
          onNavClick={handleNavClick}
          onControllerClick={handleControllerClick}
          onLogoClick={handleLogoClick}
          onReplayOpen={() => {
            setActiveTab(null)
            setCurrentScreen('open')
          }}
        />
      )}
    </div>
  )
}
