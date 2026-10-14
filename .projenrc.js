/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

const { CdktfProviderProject } = require("@cdktf/provider-project");
const project = new CdktfProviderProject({
  authorName: 'hashicorp',
  packageName: 'rhizo-co-terraform-provider-cloudflare',
  githubNamespace: 'rhizo-co',
  useCustomGithubRunner: false,
  terraformProvider: "cloudflare/cloudflare@~> 5.27.0",
  cdktfVersion: "0.20.12",
  constructsVersion: "10.4.2",
  minNodeVersion: "20.17.0",
  jsiiVersion: "^5.0.1",
  devDeps: ["@cdktf/provider-project@^0.7.23"],
});

// The github namespace contains a hyphen, which jsii rejects in a Python module
// name. The PyPI dist name may keep it, the importable module may not.
project.package.manifest.jsii.targets.python.module =
  project.package.manifest.jsii.targets.python.module.replace(/-/g, "_");

// provider-project declares these unversioned and resolves them from node_modules, which is empty
// on a fresh clone; pin them explicitly so a bootstrap install works.
project.addDevDeps("jsii-pacmak@^1.140.0", "jsii-diff@^1.140.0", "@action-validator/cli@^0.6.0", "@action-validator/core@^0.6.0");

// projen and typescript are declared unversioned too; on a fresh scaffold (no yarn.lock) yarn
// resolves projen 0.104.x (breaks provider-project's Maven publisher assert) and typescript 7.x
// (not supported by jsii 5). Pin them to the versions rhizo-co/cdktf-provider-google resolves.
project.addDevDeps("projen@^0.96.5", "typescript@^5.9.2");

project.synth();
