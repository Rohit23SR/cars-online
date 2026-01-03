import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'
import userEvent from '@testing-library/user-event'

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render button with text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('should render as button element by default', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
    })

    it('should apply default variant classes', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('data-variant', 'default')
    })

    it('should apply default size classes', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('data-size', 'default')
    })

    it('should render with data-slot attribute', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('data-slot', 'button')
    })
  })

  describe('Variants', () => {
    it('should render default variant', () => {
      render(<Button variant="default">Default</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'default')
    })

    it('should render destructive variant', () => {
      render(<Button variant="destructive">Delete</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'destructive')
    })

    it('should render outline variant', () => {
      render(<Button variant="outline">Outline</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'outline')
    })

    it('should render secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'secondary')
    })

    it('should render ghost variant', () => {
      render(<Button variant="ghost">Ghost</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'ghost')
    })

    it('should render link variant', () => {
      render(<Button variant="link">Link</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'link')
    })
  })

  describe('Sizes', () => {
    it('should render default size', () => {
      render(<Button size="default">Default Size</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'default')
    })

    it('should render small size', () => {
      render(<Button size="sm">Small</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'sm')
    })

    it('should render large size', () => {
      render(<Button size="lg">Large</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'lg')
    })

    it('should render icon size', () => {
      render(<Button size="icon">Icon</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'icon')
    })

    it('should render small icon size', () => {
      render(<Button size="icon-sm">Small Icon</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'icon-sm')
    })

    it('should render large icon size', () => {
      render(<Button size="icon-lg">Large Icon</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'icon-lg')
    })
  })

  describe('Custom Styling', () => {
    it('should accept custom className', () => {
      render(<Button className="custom-class">Custom</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('custom-class')
    })

    it('should merge custom className with variant classes', () => {
      render(
        <Button variant="destructive" className="my-custom-class">
          Delete
        </Button>
      )
      const button = screen.getByRole('button')
      expect(button.className).toContain('my-custom-class')
      expect(button).toHaveAttribute('data-variant', 'destructive')
    })
  })

  describe('HTML Attributes', () => {
    it('should accept type attribute', () => {
      render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
    })

    it('should accept disabled attribute', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('should accept aria-label', () => {
      render(<Button aria-label="Close dialog">X</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close dialog')
    })

    it('should accept id attribute', () => {
      render(<Button id="submit-btn">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('id', 'submit-btn')
    })

    it('should accept name attribute', () => {
      render(<Button name="action">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('name', 'action')
    })

    it('should accept value attribute', () => {
      render(<Button value="submit">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('value', 'submit')
    })
  })

  describe('User Interactions', () => {
    it('should call onClick handler when clicked', async () => {
      const user = userEvent.setup()
      let clicked = false
      const handleClick = () => {
        clicked = true
      }

      render(<Button onClick={handleClick}>Click me</Button>)
      await user.click(screen.getByRole('button'))
      expect(clicked).toBe(true)
    })

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup()
      let clicked = false
      const handleClick = () => {
        clicked = true
      }

      render(
        <Button disabled onClick={handleClick}>
          Click me
        </Button>
      )
      await user.click(screen.getByRole('button'))
      expect(clicked).toBe(false)
    })

    it('should call onFocus handler', async () => {
      let focused = false
      const handleFocus = () => {
        focused = true
      }

      render(<Button onFocus={handleFocus}>Focus me</Button>)
      screen.getByRole('button').focus()
      expect(focused).toBe(true)
    })

    it('should call onBlur handler', async () => {
      let blurred = false
      const handleBlur = () => {
        blurred = true
      }

      render(<Button onBlur={handleBlur}>Blur me</Button>)
      const button = screen.getByRole('button')
      button.focus()
      button.blur()
      expect(blurred).toBe(true)
    })
  })

  describe('AsChild Prop', () => {
    it('should render children as button when asChild is false', () => {
      render(<Button asChild={false}>Click me</Button>)
      expect(screen.getByRole('button').tagName).toBe('BUTTON')
    })

    it('should render as child element when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      )
      const link = screen.getByRole('link')
      expect(link.tagName).toBe('A')
      expect(link).toHaveAttribute('href', '/test')
    })

    it('should apply button styles to child element when asChild', () => {
      render(
        <Button asChild variant="destructive">
          <a href="/test">Delete Link</a>
        </Button>
      )
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('data-variant', 'destructive')
    })
  })

  describe('Disabled State', () => {
    it('should apply disabled styles', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('should not be clickable when disabled', async () => {
      const user = userEvent.setup()
      let clicked = false

      render(
        <Button disabled onClick={() => (clicked = true)}>
          Disabled
        </Button>
      )
      await user.click(screen.getByRole('button'))
      expect(clicked).toBe(false)
    })
  })

  describe('Form Integration', () => {
    it('should work as submit button in form', () => {
      let submitted = false
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        submitted = true
      }

      render(
        <form onSubmit={handleSubmit}>
          <Button type="submit">Submit</Button>
        </form>
      )

      screen.getByRole('button').click()
      expect(submitted).toBe(true)
    })

    it('should work as reset button in form', () => {
      render(
        <form>
          <input defaultValue="test" />
          <Button type="reset">Reset</Button>
        </form>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'reset')
    })
  })

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      render(<Button>Accessible</Button>)
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })

    it('should support aria-disabled', () => {
      render(<Button aria-disabled="true">Disabled</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
    })

    it('should support aria-pressed for toggle buttons', () => {
      render(<Button aria-pressed="true">Toggle</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    })

    it('should have accessible name from text content', () => {
      render(<Button>Accessible Button</Button>)
      expect(screen.getByRole('button', { name: 'Accessible Button' })).toBeInTheDocument()
    })

    it('should have accessible name from aria-label', () => {
      render(<Button aria-label="Close">X</Button>)
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should render with empty children', () => {
      render(<Button></Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render with multiple children', () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      )
      expect(screen.getByRole('button')).toBeInTheDocument()
      expect(screen.getByText('Icon')).toBeInTheDocument()
      expect(screen.getByText('Text')).toBeInTheDocument()
    })

    it('should handle very long text', () => {
      const longText = 'This is a very long button text that might wrap to multiple lines'
      render(<Button>{longText}</Button>)
      expect(screen.getByRole('button', { name: longText })).toBeInTheDocument()
    })

    it('should handle special characters in text', () => {
      render(<Button>{"<>&\"'"}</Button>)
      expect(screen.getByRole('button')).toHaveTextContent("<>&\"'")
    })
  })

  describe('Combination of Props', () => {
    it('should work with variant and size together', () => {
      render(
        <Button variant="destructive" size="lg">
          Large Delete
        </Button>
      )
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('data-variant', 'destructive')
      expect(button).toHaveAttribute('data-size', 'lg')
    })

    it('should work with all props together', () => {
      const handleClick = () => {}
      render(
        <Button
          variant="outline"
          size="sm"
          className="custom"
          onClick={handleClick}
          disabled={false}
          type="button"
          aria-label="Test"
        >
          Complex Button
        </Button>
      )
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('data-variant', 'outline')
      expect(button).toHaveAttribute('data-size', 'sm')
      expect(button.className).toContain('custom')
      expect(button).toHaveAttribute('type', 'button')
      expect(button).toHaveAttribute('aria-label', 'Test')
    })
  })
})
