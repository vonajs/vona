# $css

## Global style

Several global style beans can be created based on business needs, and several style variables are pre-generated in the global beans, so that they can be injected and used in any bean instance

### Create global style beans

::: tip
Context Menu - [Module Path]: `Zova Create/Bean: Style`
:::

Enter the name of style bean according to the prompt, such as `myStyle`. The VSCode extension will automatically create the code skeleton of `style bean`

### Default global style bean

Zova provides a global style Bean in the module `home-base`. We can provide some global styles directly here

`src/suite/a-home/modules/home-base/src/bean/css.default.ts`

```typescript
@Css()
export class CssDefault extends BeanBase {
  textCenter: string;
  buttonPrimary: string;

  protected async __init__() {
    this.textCenter = this.$style({ textAlign: 'center' });
    this.buttonPrimary = useComputed(() => {
      return this.$style({
        color: this.$token.color.primary,
        borderColor: this.$token.var.borderColor,
      });
    });
  }
}
```

- `this.textCenter` is a static style
- `this.buttonPrimary` is a dynamic style

### Use default global style bean

```typescript
export class RenderTest extends BeanRenderBase {
  @Use()
  $$cssDefault: CssDefault;

  render() {
    return (
      <div class={this.$$cssDefault.textCenter}>Hello Zova</div>
    );
  }
}
```

- Use `@Use` to inject the Bean instance

## $css

Since the default global style bean can be used extensively across different bean instances. To simplify the code, Zova injects a `$css` object into the `BeanBase` base class, so that global styles can be directly accessed through `this.$css` in any bean instance

```typescript
export class RenderTest extends BeanRenderBase {
  render() {
    return (
      <div class={this.$css.textCenter}>Hello Zova</div>
    );
  }
}
```
