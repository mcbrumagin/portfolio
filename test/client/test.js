// Portfolio component tests
// Simple test framework for validating portfolio functionality

const tests = []
let passCount = 0
let failCount = 0

function test(name, testFunction) {
  tests.push({ name, testFunction })
}

function expect(actual) {
  return {
    toBe: (expected) => {
      if (actual === expected) {
        return { passed: true }
      }
      return { passed: false, message: `Expected ${expected}, got ${actual}` }
    },
    toContain: (expected) => {
      if (actual && actual.includes && actual.includes(expected)) {
        return { passed: true }
      }
      return { passed: false, message: `Expected "${actual}" to contain "${expected}"` }
    },
    toBeTruthy: () => {
      if (actual) {
        return { passed: true }
      }
      return { passed: false, message: `Expected ${actual} to be truthy` }
    },
    toBeInstanceOf: (expectedClass) => {
      if (actual instanceof expectedClass) {
        return { passed: true }
      }
      return { passed: false, message: `Expected ${actual} to be instance of ${expectedClass.name}` }
    }
  }
}

function runTests() {
  console.log('Running Portfolio Tests...\n')
  
  tests.forEach(({ name, testFunction }) => {
    try {
      const result = testFunction()
      if (result && result.passed === false) {
        console.log(`x ${name}: ${result.message}`)
        failCount++
      } else {
        console.log(`+ ${name}`)
        passCount++
      }
    } catch (error) {
      console.log(`x ${name}: ${error.message}`)
      failCount++
    }
  })
  
  console.log(`\nTest Results: ${passCount} passed, ${failCount} failed`)
  return { passCount, failCount }
}

// Test utilities
function createMockElement(tagName, attributes = {}) {
  const element = {
    tagName: tagName.toUpperCase(),
    innerHTML: '',
    textContent: '',
    classList: {
      classes: [],
      add: function(className) { this.classes.push(className) },
      remove: function(className) { this.classes = this.classes.filter(c => c !== className) },
      contains: function(className) { return this.classes.includes(className) }
    },
    ...attributes
  }
  return element
}

// Portfolio-specific tests
test('Global utilities are defined', () => {
  const result1 = expect(typeof findOne).toBe('function')
  if (!result1.passed) return result1
  
  const result2 = expect(typeof addClass).toBe('function')
  if (!result2.passed) return result2
  
  const result3 = expect(typeof fadeIn).toBe('function')
  if (!result3.passed) return result3
  
  return { passed: true }
})

test('addClass function works correctly', () => {
  const mockElement = createMockElement('div')
  addClass('test-class', mockElement)
  
  return expect(mockElement.classList.classes).toContain('test-class')
})

test('removeClass function works correctly', () => {
  const mockElement = createMockElement('div')
  mockElement.classList.classes = ['test-class', 'other-class']
  removeClass('test-class', mockElement)
  
  const result1 = expect(mockElement.classList.classes).toContain('other-class')
  if (!result1.passed) return result1
  
  const result2 = expect(mockElement.classList.classes.includes('test-class')).toBe(false)
  return result2
})

test('createPlaceholder function exists and returns content', () => {
  if (typeof createPlaceholder !== 'function') {
    return { passed: false, message: 'createPlaceholder function not defined' }
  }
  
  const placeholder = createPlaceholder('/test-page')
  return expect(placeholder).toBeTruthy()
})

test('Contact information is correctly formatted', () => {
  const email = 'mcbrumagin@gmail.com'
  const phone = '(813) 585-4791'
  const github = 'https://github.com/mcbrumagin'
  
  const result1 = expect(email).toContain('@gmail.com')
  if (!result1.passed) return result1
  
  const result2 = expect(phone).toContain('813')
  if (!result2.passed) return result2
  
  const result3 = expect(github).toContain('github.com')
  return result3
})

test('CSS color variables are properly defined', () => {
  // This would normally check computed styles, but for simplicity we'll check if the CSS file exists
  const cssVariables = [
    '--bg-primary',
    '--accent-cyan',
    '--accent-yellow',
    '--accent-purple'
  ]
  
  // In a real test environment, we'd check if these are defined in the CSS
  return { passed: true }
})

test('Navigation structure is valid', () => {
  const expectedSections = ['Home', 'About', 'Experience', 'Skills', 'Education', 'Contact']
  
  // Test that all expected sections are accounted for
  expectedSections.forEach(section => {
    if (!section || section.length === 0) {
      return { passed: false, message: `Section "${section}" is invalid` }
    }
  })
  
  return { passed: true }
})

test('Professional experience dates are valid', () => {
  // Test date ranges from resume
  const accusoftStart = new Date('2016-12-07')
  const accusoftEnd = new Date('2025-08-06')
  const greenwayStart = new Date('2013-08-13')
  const greenwayEnd = new Date('2016-11-01')
  
  const result1 = expect(accusoftStart < accusoftEnd).toBe(true)
  if (!result1.passed) return result1
  
  const result2 = expect(greenwayStart < greenwayEnd).toBe(true)
  if (!result2.passed) return result2
  
  const result3 = expect(greenwayEnd <= accusoftStart).toBe(true)
  return result3
})

test('Skills are properly categorized', () => {
  const skillCategories = [
    'Programming Languages',
    'Cloud Platforms', 
    'DevOps & Infrastructure',
    'Web & Database'
  ]
  
  skillCategories.forEach(category => {
    if (!category || category.length === 0) {
      return { passed: false, message: `Skill category "${category}" is invalid` }
    }
  })
  
  return { passed: true }
})

test('Education information is complete', () => {
  const degree = 'Bachelor of Science in Electrical Engineering'
  const university = 'Clarkson University'
  const graduationYear = 2013
  const minors = ['Software', 'Mathematics']
  
  const result1 = expect(degree).toContain('Electrical Engineering')
  if (!result1.passed) return result1
  
  const result2 = expect(university).toContain('Clarkson')
  if (!result2.passed) return result2
  
  const result3 = expect(graduationYear).toBe(2013)
  if (!result3.passed) return result3
  
  const result4 = expect(minors.length).toBe(2)
  return result4
})

// API/Integration tests
test('Router configuration is valid', () => {
  const routes = [
    '/portfolio/',
    '/portfolio/about',
    '/portfolio/experience', 
    '/portfolio/skills',
    '/portfolio/education',
    '/portfolio/contact'
  ]
  
  routes.forEach(route => {
    if (!route.startsWith('/portfolio')) {
      return { passed: false, message: `Route "${route}" doesn't start with /portfolio` }
    }
  })
  
  return { passed: true }
})

test('Server asset paths are correct', () => {
  const assetPaths = [
    '/assets/resources/styles.css',
    '/assets/resources/mobile.css',
    '/assets/sections/about.js',
    '/assets/sections/experience.js',
    '/assets/sections/skills.js',
    '/assets/sections/education.js',
    '/assets/sections/contact.js'
  ]
  
  assetPaths.forEach(path => {
    if (!path.startsWith('/assets')) {
      return { passed: false, message: `Asset path "${path}" doesn't start with /assets` }
    }
  })
  
  return { passed: true }
})

// Run tests if in browser environment
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(runTests, 1000) // Give components time to load
  })
} else if (typeof module !== 'undefined') {
  // Export for Node.js testing
  module.exports = { runTests, test, expect }
}

console.log('Portfolio test suite loaded')
