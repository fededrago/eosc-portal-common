import React, {Component} from "react";
import {render} from "react-dom";
import * as _ from "lodash";
import {ComponentDocInfo} from "./component-doc-info.interface";
import {componentsDocsInfo} from "./components-docs.data";

export class EoscComponentDoc extends Component<ComponentDocInfo, any> {
  render() {
    return (
      <div key={_.uniqueId("eosc-component-doc")}>
        <h3>{this.props.name}</h3>
        <p dangerouslySetInnerHTML={{__html: this.props.htmlDescription}}/>

        <br/>
        {EoscComponentDoc._getParams(this.props.parameters)}
        <br/>
        {EoscComponentDoc._getFunctions(this.props.functions)}
        <br/>
        {EoscComponentDoc._getExamples(this.props.examples)}
        <br/>

        <a href="#">Go to top</a>
      </div>
    );
  }

  private static _getParams(params: any) {
    if (!params || params.length === 0) {
      return (<></>);
    }

    return (
      <>
        <b>Parameters</b>
        <ul>
          {params.map((param: any) => (
            <>
              <li key={_.uniqueId("eosc-component-doc-li")}>{param.name}</li>
              <blockquote><p dangerouslySetInnerHTML={{__html: param.htmlDescription}}/></blockquote>
            </>
          ))}
        </ul>
      </>
    )
  }

  private static _getFunctions(functions: any) {
    if (!functions || functions.length === 0) {
      return (<></>);
    }

    return (
      <>
        <b>Functions</b>
        <ul>
          {functions.map((docFunction: any) => (
            <>
              <li key={_.uniqueId("eosc-component-doc-li")}>{docFunction.name}</li>
              <blockquote key={_.uniqueId("eosc-component-doc-quote")}><p
                dangerouslySetInnerHTML={{__html: docFunction.htmlDescription}}/></blockquote>
            </>
          ))}
        </ul>
      </>
    );
  }

  private static _getExamples(examples: any) {
    if (!examples || examples.length === 0) {
      return (<></>);
    }

    return (
      <>
        <b>Examples</b>
        <ul>
          {examples.map((example: any) => (
            <>
              <li key={_.uniqueId("eosc-component-doc-li")}>{example.title}</li>
              {
                !!example.htmlDescription
                  ? <blockquote><p dangerouslySetInnerHTML={{__html: example.htmlDescription}}/>
                  </blockquote>
                  : <></>
              }
              <br/>
              <div key={_.uniqueId("eosc-component-doc-tag")}
                   dangerouslySetInnerHTML={{__html: example.htmlTag}}/>
              <br/>
              <pre key={_.uniqueId("eosc-component-doc-code")}><code>{example.htmlTag}</code></pre>
            </>
          ))}
        </ul>
      </>
    );
  }
}

const EoscComponentsDocsElement = document.getElementsByTagName("eosc-components-docs")[0];
render(
  (
    <React.Fragment>
      {
        componentsDocsInfo
          .map((info) => {
            return <EoscComponentDoc
              key={_.uniqueId("eosc-component-doc")}
              name={info.name}
              htmlDescription={info.htmlDescription}
              examples={info.examples}
              parameters={info.parameters}
              functions={info.functions}
            />
          })
      }
    </React.Fragment>
  ),
  EoscComponentsDocsElement
);
