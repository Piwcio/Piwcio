<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg">
  <img src="assets/banner-light.svg" alt="Paweł Piwowar, Cloud DevOps Engineer. Cloud. Code. Curiosity." width="100%">
</picture>

<p align="center">
  <a href="https://piwowarpawel.com/">piwowarpawel.com</a> ·
  <a href="https://radar.piwowarpawel.com/en/">Career Radar</a> ·
  <a href="https://www.linkedin.com/in/pawelpiwowar88/">LinkedIn</a> ·
  <a href="https://www.credly.com/users/pawel-piwowar.56832a3a/badges/credly">Credly</a> ·
  <a href="https://learn.microsoft.com/en-us/users/pawepiwowar/transcript/vn6rwsyj1lqylkq">Microsoft Learn</a>
</p>

## Hi, I'm Paweł 👋

Self-taught, I went from PC building and IT support to DevOps. These days that means Azure, IONOS
and VMware, infrastructure as code, automating repeatable work and making sure the logs help when
something breaks. Next on my path are platform engineering, AI infrastructure and cloud
architecture.

## What I work on

- **Hybrid cloud.** 80+ cloud subscriptions and 1,000+ virtual machines in the environment I work
  with, together with 15+ teams.
- **Infrastructure as code.** Terraform, Ansible and Bicep in Git, with around 70% of provisioning
  automated.
- **Observability.** A Grafana stack I built and run, with 50 dashboards as code and millions of
  log lines a day in VictoriaLogs.
- **Migrations.** Co-led a production move from VMware vCenter to Azure and IONOS, and now driving
  a second, larger one.
- **AI-assisted engineering.** Claude, ChatGPT and Copilot for code, reviews and documentation,
  with every change reviewed before it ships.

## Projects

| Project | What it is | Built with |
|---|---|---|
| [piwowarpawel.com](https://piwowarpawel.com/) | My EN/PL portfolio, released like a production service with STAGE checks and an approval before PROD | Astro, TypeScript, Azure Pipelines, Cloudflare Workers |
| [Career Radar](https://radar.piwowarpawel.com/en/) | An interactive ranking of 63 IT roles in Poland, with market data from the official SOLID.Jobs API refreshed every week | Astro, TypeScript, Azure Pipelines, Cloudflare |
| [HomeLab 3.0](#homelab-30) | A lab for the whole path from a reviewed change to a running, observable service. Under construction | VMware Workstation Pro, Terraform, Ansible, k3s, Argo CD, Grafana |

## HomeLab 3.0

My old lab had around 30 Hyper-V VMs. It taught me a lot about Windows, Linux and infrastructure,
but too much of it depended on manual setup. So I cleared it out and started again with a clearer
goal.

HomeLab 3.0 is a smaller platform for DevOps, SRE, platform engineering and AI-assisted
operations. Deploy a service, watch it, break it on purpose, recover it and rebuild it from code.
Preferably without a notebook full of mystery settings.

VMware Workstation Pro is the foundation. Azure DevOps Services and self-hosted Linux agents are
coming together as the delivery path. Kubernetes, GitOps, wider observability and the local AI
platform come next, and each part goes in only after testing. The whole lab is still under
construction.

| Layer | Tools | What it's for |
|---|---|---|
| Foundation | VMware Workstation Pro, Linux, Windows | Guest machines for networking, deployments and recovery practice |
| Delivery | Azure DevOps Services, self-hosted Linux agents | A repeatable path from a reviewed change to a deployment |
| Infrastructure as code | Terraform, Bicep, Ansible | Definitions in Git, so nothing has to be rebuilt from memory |
| Platform | Kubernetes, k3s, Argo CD | Deployments, configuration drift, rollback and rebuilding a cluster |
| Visibility | Grafana, Prometheus, VictoriaMetrics, VictoriaLogs, Alloy, OpenTelemetry | Understanding a failure and checking the recovery |
| Local AI | Local LLMs, LangGraph, Qdrant, Neo4j | My own platform for agents, retrieval and experiments |

The local AI part is planned around one path.

<p align="center"><code>gather context</code> → <code>retrieve</code> → <code>propose</code> → <code>review</code> → <code>run</code> → <code>observe</code></p>

Qdrant is there to find the relevant material, Neo4j to map how systems relate to their context
and LangGraph to connect the steps with a local model. The design puts a dry-run and my approval
in front of anything destructive, and OpenTelemetry with Grafana should show what every step did.

The lab is also where I practise CI/CD and GitOps deployments, deliberate failures, rollback and
recovery drills, SRE scenarios and hardening, all at a scale I can fully understand. There will
probably be a few broken clusters along the way. 🙂

The [HomeLab page](https://piwowarpawel.com/homelab/) has the architecture diagram, and
[the rebuild story](https://piwowarpawel.com/articles/homelab-3-rebuild/) explains why I started
over. The code lives in the private `homelab-platform` repository.

## Private repositories

My code lives in Azure DevOps. Changes go through pull requests and pipelines there, and a pipeline
mirrors each repository to a private copy on GitHub.

| Repository | Purpose |
|---|---|
| `personal-website` | piwowarpawel.com, the code-generated CV and the delivery pipelines |
| `career-radar` | Career Radar, its weekly SOLID.Jobs harvest and its pipelines |
| `homelab-platform` | HomeLab 3.0 infrastructure, configuration and automation |
| `pawel-ai-context` | A knowledge base about my work that I give to AI assistants |

This profile works the same way. It is edited in Azure DevOps and a pipeline publishes it here
after every change.

## Tech stack

<!-- stack:start -->
<p>
<b>Cloud &amp; virtualisation</b><br>
<img src="assets/stack/microsoft-azure.svg" alt="Microsoft Azure">
<img src="assets/stack/ionos-cloud.svg" alt="IONOS Cloud">
<img src="assets/stack/vmware-vsphere-vcenter.svg" alt="VMware vSphere · vCenter">
</p>

<p>
<b>Automation &amp; delivery</b><br>
<img src="assets/stack/terraform.svg" alt="Terraform">
<img src="assets/stack/ansible.svg" alt="Ansible">
<img src="assets/stack/azure-devops.svg" alt="Azure DevOps">
<img src="assets/stack/azure-bicep.svg" alt="Azure Bicep">
<img src="assets/stack/bash.svg" alt="Bash">
<img src="assets/stack/powershell.svg" alt="PowerShell">
<img src="assets/stack/python.svg" alt="Python">
<img src="assets/stack/jenkins.svg" alt="Jenkins">
<img src="assets/stack/github-actions.svg" alt="GitHub Actions">
</p>

<p>
<b>Observability</b><br>
<img src="assets/stack/grafana.svg" alt="Grafana">
<img src="assets/stack/prometheus.svg" alt="Prometheus">
<img src="assets/stack/victoriametrics.svg" alt="VictoriaMetrics">
<img src="assets/stack/victorialogs.svg" alt="VictoriaLogs">
<img src="assets/stack/grafana-alloy.svg" alt="Grafana Alloy">
<img src="assets/stack/loki.svg" alt="Loki">
<img src="assets/stack/tempo.svg" alt="Tempo">
<img src="assets/stack/opentelemetry.svg" alt="OpenTelemetry">
<img src="assets/stack/checkmk.svg" alt="Checkmk">
<img src="assets/stack/site24x7.svg" alt="Site24x7">
</p>

<p>
<b>Containers &amp; GitOps</b><br>
<img src="assets/stack/kubernetes.svg" alt="Kubernetes">
<img src="assets/stack/docker.svg" alt="Docker">
<img src="assets/stack/git.svg" alt="Git">
<img src="assets/stack/argo-cd.svg" alt="Argo CD">
</p>

<p>
<b>Systems &amp; operations</b><br>
<img src="assets/stack/linux.svg" alt="Linux">
<img src="assets/stack/windows-server.svg" alt="Windows Server">
<img src="assets/stack/active-directory.svg" alt="Active Directory">
<img src="assets/stack/postgresql-mysql-mariadb.svg" alt="PostgreSQL · MySQL · MariaDB">
</p>

<p>
<b>Identity, security &amp; ITSM</b><br>
<img src="assets/stack/microsoft-entra-id.svg" alt="Microsoft Entra ID">
<img src="assets/stack/jira-service-management.svg" alt="Jira Service Management">
<img src="assets/stack/pagerduty.svg" alt="PagerDuty">
<img src="assets/stack/opnsense.svg" alt="OPNsense">
<img src="assets/stack/sophos.svg" alt="Sophos">
<img src="assets/stack/cisco-networking.svg" alt="Cisco networking">
</p>

<p>
<b>AI &amp; workflow engineering</b><br>
<img src="assets/stack/claude.svg" alt="Claude">
<img src="assets/stack/chatgpt.svg" alt="ChatGPT">
<img src="assets/stack/github-copilot.svg" alt="GitHub Copilot">
<img src="assets/stack/n8n.svg" alt="n8n">
<img src="assets/stack/open-webui.svg" alt="Open WebUI">
<img src="assets/stack/openrouter.svg" alt="OpenRouter">
<img src="assets/stack/local-llms.svg" alt="Local LLMs">
<img src="assets/stack/langgraph.svg" alt="LangGraph">
<img src="assets/stack/qdrant.svg" alt="Qdrant">
</p>

<p>
<b>Web projects</b><br>
<img src="assets/stack/astro.svg" alt="Astro">
<img src="assets/stack/typescript.svg" alt="TypeScript">
<img src="assets/stack/cloudflare.svg" alt="Cloudflare">
</p>
<!-- stack:end -->

<sub>Icons drawn for this profile. Levels and details for every tool are on <a href="https://piwowarpawel.com/#stack">piwowarpawel.com</a>.</sub>

## Certifications and learning

| | |
|---|---|
| ✅ **AZ-104** Azure Administrator Associate · June 2026 | [Microsoft Learn transcript](https://learn.microsoft.com/en-us/users/pawepiwowar/transcript/vn6rwsyj1lqylkq) |
| ✅ **CCST** Cisco Support Technician Networking · February 2024 | [Credly badge](https://www.credly.com/badges/fc4eb4f9-97ed-4030-99fa-c47b347344cf/public_url) |
| 🎓 Google AI Skills of Tomorrow 3.0 · May 2026 | [Google Skills profile](https://www.skills.google/public_profiles/255b7eb5-37a4-4ed7-9411-f7421523eb5b?locale=en) |
| 🎓 EC-Council EHE, NDE and Cybersecurity Attacks and Defense Strategies · May 2024 | [EC-Council certificate](https://codered.eccouncil.org/certificate/d47e65ea-7f8d-4862-b566-086dc633f284) |
| ⏳ In progress | AZ-400, AZ-401, AZ-305 |
| 🧭 On the roadmap | CKA, Terraform Associate |

<sub>Edited in Azure DevOps and mirrored here by a pipeline. Facts match piwowarpawel.com.</sub>
