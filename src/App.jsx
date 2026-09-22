import React, { useState, useEffect } from 'react'
import OpeningSequence from './components/OpeningSequence'
import Wireframe2Destination from './components/Wireframe2Destination'
import BasicPhilosophyPage from './components/BasicPhilosophyPage'
import EnvironmentConditionPage from './components/EnvironmentConditionPage'
import InfluencePage from './components/InfluencePage'
import ConclusionPage from './components/ConclusionPage'
import CamindGame from './components/game/CamindGame'

export default function App() {
  // URL tab query support for direct navigation
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const initialTab = urlParams?.get('tab') || null
  const initialScreen = initialTab === 'theory' ? 'theory'
    : initialTab === 'environment' || initialTab === 'history' ? 'environment'
    : initialTab === 'influence' ? 'influence'
    : initialTab === 'conclusion' ? 'conclusion'
    : initialTab === 'intro' ? 'wireframe2'
    : initialTab === 'game' ? 'game'
    : 'open'

  // Screen state: 'open' | 'wireframe2' | 'theory' | 'environment' | 'influence' | 'conclusion' | 'game'
  const [currentScreen, setCurrentScreen] = useState(initialScreen)
  // Track previous screen before entering game so exiting returns correctly
  const [previousScreen, setPreviousScreen] = useState(initialScreen !== 'game' ? initialScreen : 'wireframe2')
  // Active nav tab: default null -> all 4 tabs render WHITE
  const [activeTab, setActiveTab] = useState(initialTab === 'game' ? null : initialTab)
  // Active controller state: default true if starting in game, else false
  const [isControllerActive, setIsControllerActive] = useState(initialScreen === 'game')

  // Keep URL query in sync for shareable links (?tab=game, etc.)
  const updateUrlParam = (tabName) => {
    if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
      const newUrl = tabName ? `${window.location.pathname}?tab=${tabName}` : window.location.pathname
      window.history.replaceState(null, '', newUrl)
    }
  }

  const handleNavClick = (tabKey) => {
    setIsControllerActive(false)
    setActiveTab(tabKey)
    if (tabKey === 'intro') {
      setCurrentScreen('wireframe2')
      updateUrlParam('intro')
    } else if (tabKey === 'theory') {
      setCurrentScreen('theory')
      updateUrlParam('theory')
    } else if (tabKey === 'history' || tabKey === 'environment') {
      setCurrentScreen('environment')
      updateUrlParam('environment')
    } else if (tabKey === 'influence') {
      setCurrentScreen('influence')
      updateUrlParam('influence')
    } else if (tabKey === 'conclusion') {
      setCurrentScreen('conclusion')
      updateUrlParam('conclusion')
    } else if (tabKey === 'game') {
      setPreviousScreen(currentScreen !== 'game' ? currentScreen : 'wireframe2')
      setIsControllerActive(true)
      setCurrentScreen('game')
      updateUrlParam('game')
    }
  }

  const handleControllerClick = (nextState) => {
    if (currentScreen === 'game') {
      // Toggle back to previous screen
      setIsControllerActive(false)
      const targetScreen = previousScreen || 'wireframe2'
      setCurrentScreen(targetScreen)
      const targetTab = targetScreen === 'wireframe2' ? 'intro' : targetScreen === 'open' ? null : targetScreen
      setActiveTab(targetTab)
      updateUrlParam(targetTab)
    } else {
      // Switch to game screen
      setPreviousScreen(currentScreen)
      setIsControllerActive(true)
      setActiveTab(null)
      setCurrentScreen('game')
      updateUrlParam('game')
    }
  }

  const handleLogoClick = () => {
    setActiveTab(null)
    setIsControllerActive(false)
    setCurrentScreen('open')
    updateUrlParam(null)
  }

  const handleExitGame = () => {
    setIsControllerActive(false)
    const targetScreen = previousScreen && previousScreen !== 'game' ? previousScreen : 'wireframe2'
    setCurrentScreen(targetScreen)
    const targetTab = targetScreen === 'wireframe2' ? 'intro' : targetScreen === 'open' ? null : targetScreen
    setActiveTab(targetTab)
    updateUrlParam(targetTab)
  }

  return (
    <div className="app-container">
      {currentScreen === 'game' ? (
        <CamindGame
          onExitToHome={handleExitGame}
          onNavClick={handleNavClick}
          onLogoClick={handleLogoClick}
          onControllerClick={handleControllerClick}
        />
      ) : currentScreen === 'open' ? (
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
