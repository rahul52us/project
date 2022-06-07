import React from "react";
import { EditorState } from "draft-js";
import createInlineToolbarPlugin,{Separator} from "draft-js-inline-toolbar-plugin";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin";
import Editor from 'draft-js-plugins-editor';
import createCounterPlugin from 'draft-js-counter-plugin';
import createImagePlugin from 'draft-js-counter-plugin'
import createDividerPlugin from 'draft-js-divider-plugin';
import createUndoPlugin from 'draft-js-undo-plugin';
import createTextAlignmentPlugin from '@draft-js-plugins/text-alignment';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "draft-js-buttons";

//npm i draft-js-plugins-editor
// import "./App.css";



import "draft-js/dist/Draft.css";

import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-divider-plugin/lib/plugin.css';
import 'draft-js-undo-plugin/lib/plugin.css';


const dividerPlugin = createDividerPlugin();

const { DividerButton } = dividerPlugin;

const undoPlugin = createUndoPlugin();

const { UndoButton, RedoButton } = undoPlugin;

const textAlignmentPlugin = createTextAlignmentPlugin();

const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
    DividerButton,
    UndoButton,
    RedoButton
  ]
});
 

console.log(inlineToolbarPlugin)
const { InlineToolbar } = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const counterPlugin = createCounterPlugin();
const { CharCounter, WordCounter, LineCounter, CustomCounter } = counterPlugin;



const imagePlugin = createImagePlugin();



const plugins = [inlineToolbarPlugin, sideToolbarPlugin,emojiPlugin,counterPlugin,dividerPlugin,imagePlugin,undoPlugin,textAlignmentPlugin];

class DraftJsComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      search: '',
      replace: '',
    };
    this.changeState = this.changeState.bind(this);
  }

  onChangeSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  onChangeReplace = (e) => {
    this.setState({
      replace: e.target.value,
    });
  }

  onReplace = () => {
    console.log(`replacing "${this.state.search}" with "${this.state.replace}"`);
  }


  changeState(state) {
    this.setState({
      editorState: state
    });
  }

  render() {
    return (
      <>
      <div style={{marginLeft:100,marginTop:100}}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.changeState}
          placeholder="Tell your story..."
          plugins={plugins}
        />
        <EmojiSuggestions />
        <EmojiSelect style={{marginTop:50}}/>
        <InlineToolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            (externalProps) => (
              <>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <CodeButton {...externalProps} />
                <HeadlineOneButton {...externalProps} />
                <Separator {...externalProps} />  
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <CodeBlockButton {...externalProps} />   
                <DividerButton {...externalProps} />                 
                <UndoButton {...externalProps} /> 
                <RedoButton {...externalProps} /> 
                <textAlignmentPlugin.TextAlignment {...externalProps} />
              </>
            )
          }
        </InlineToolbar>
     
        <SideToolbar />
        <br />
        <CharCounter limit={200} /> characters
        <br />
        <WordCounter limit={30} /> words
        <br />
        <LineCounter limit={10} /> lines
        <br />
        
      </div>

      </>
    );
  }
}

export default DraftJsComp;