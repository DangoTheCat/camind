import React, { useState } from 'react'
import OpeningSequence from './components/OpeningSequence'
import Wireframe2Destination from './components/Wireframe2Destination'
import BasicPhilosophyPage from './components/BasicPhilosophyPage'

export default function App() {
  // Screen state: 'open' | 'wireframe2' | 'theory'
  const [currentScreen, setCurrentScreen] = useState('open')
  // Active nav tab: default null -> all 4 tabs render WHITE
  const [activeTab, setActiveTab] = useState(null)
  // Active controller state: default false (white background, black icon)
  // When clicked: true (dark gold gradient #000000 -> #AD9000, white icon)
  const [isControllerActive, setIsControllerActive] = useState(false)

  const handleNavClick = (tabKey) => {
    setActiveTab(tabKey)
    if (tabKey === 'intro') {
      setCurrentScreen('wireframe2')
    } else if (tabKey === 'theory') {
      setCurrentScreen('theory')
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
