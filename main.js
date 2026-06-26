const { Plugin } = require("obsidian");
const { keymap } = require("@codemirror/view");
const { Prec, EditorSelection } = require("@codemirror/state");

module.exports = class LatexIndentPlugin extends Plugin {
  async onload() {
    this.registerEditorExtension(
      Prec.highest(
        keymap.of([
          {
            key: "Tab",
            preventDefault: true,
            run: (view) => {
              const INDENT = "$\\qquad$ "; // 2em + 尾随空格避免 KaTeX 数字误读
              const tr = view.state.changeByRange((range) => ({
                changes: { from: range.from, to: range.to, insert: INDENT },
                range: EditorSelection.cursor(range.from + INDENT.length),
              }));
              view.dispatch(tr);
              return true;
            },
          },
        ])
      )
    );
  }
};
