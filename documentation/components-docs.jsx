import React, {Component} from "react";
import {render} from "react-dom";
import uniqueId from "lodash-es/uniqueId";
import {ComponentDocInfo} from "./component-doc-info.interface";
import {componentsDocsInfo} from "./components-docs.data";

export class EoscComponentDoc extends Component<ComponentDocInfo, any> {
  render() {
    return (
      <div key={uniqueId("eosc-component-doc")}>
        <h3>{this.props.name}</h3>
        <p dangerouslySetInnerHTML={{__html: this.props.htmlDescription}}/>

        <br/>
        {EoscComponentDoc._getSourceAndScript(this.props.targetFileName)}
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

  private static _getSourceAndScript(targetFileName: string) {
    return (
      <>
        <p>Attach the single compound with:</p>

        <ul>
          <li>
            <p>Development data</p>
            <pre><code style={ {cursor: "pointer"} } onClick={async () => {await navigator.clipboard.writeText(
              `<link rel="stylesheet" href="https://s3.cloud.cyfronet.pl/eosc-portal-common/${targetFileName}.development.min.css" />`
            )}}>
              &lt;link rel={"stylesheet"} href={`https://s3.cloud.cyfronet.pl/eosc-portal-common/${targetFileName}.development.min.css`} /&gt;
            </code></pre>
            <pre><code style={ {cursor: "pointer"} } onClick={async () => {await navigator.clipboard.writeText(
              `<script src="https://s3.cloud.cyfronet.pl/eosc-portal-common/${targetFileName}.development.min.js"></script>`
            )}}>
              &lt;script src={`https://s3.cloud.cyfronet.pl/eosc-portal-common/${targetFileName}.development.min.js`}&gt;&lt;/script&gt;
            </code></pre>
          </li>
          <li>
            <p>Production data</p>
            <pre><code style={ {cursor: "pointer"} } onClick={async () => {await navigator.clipboard.writeText(
              `<link rel="stylesheet" href="https://s3.cloud.cyfronet.pl/eosc-portal-common/${targetFileName}.production.min.css" />`
            )}}>
              &lt;link rel={"stylesheet"} href={`https://s3.cloud.cyfronet.pl/eosc-portal-common/${targetFileName}.production.min.css`} /&gt;
            </code></pre>
            <pre><code style={ {cursor: "pointer"} } onClick={async () => {await navigator.clipboard.writeText(
              `<script src="https://s3.cloud.cyfronet.pl/eosc-portal-common/${targetFileName}.development.min.js"></script>`
            )}}>
              &lt;script src={`https://s3.cloud.cyfronet.pl/eosc-portal-common/${targetFileName}.development.min.js`}&gt;&lt;/script&gt;
            </code></pre>
          </li>
        </ul>
      </>
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
              <li key={uniqueId("eosc-component-doc-li")}>{param.name}</li>
              <i key={uniqueId("eosc-component-doc-i")}><p dangerouslySetInnerHTML={{__html: param.htmlDescription}}/></i>
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
              <li key={uniqueId("eosc-component-doc-li")}>{docFunction.name}</li>
              <p
                key={uniqueId("eosc-component-doc-quote")}
                dangerouslySetInnerHTML={{__html: docFunction.htmlDescription}}
              />
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
              <li key={uniqueId("eosc-component-doc-li")}>{example.title}</li>
              {
                !!example.htmlDescription
                  ? <p dangerouslySetInnerHTML={{__html: example.htmlDescription}}/>
                  : <></>
              }
              <br/>
              <div key={uniqueId("eosc-component-doc-tag")}
                   dangerouslySetInnerHTML={{__html: example.htmlTag}}/>
              <br/>
              <pre key={uniqueId("eosc-component-doc-code")}><code>{example.htmlTag}</code></pre>
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
          .map((info) => <EoscComponentDoc
            key={uniqueId("eosc-component-doc")}
            {...info}
          />)
      }
    </React.Fragment>
  ),
  EoscComponentsDocsElement
);
