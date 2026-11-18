<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg">
  <img src="assets/banner-light.svg" alt="Paweł Piwowar, Cloud DevOps Engineer. An illustrated board shows Grafana, Terraform and n8n." width="100%">
</picture>

<p align="center">
  <a href="https://piwowarpawel.com/">piwowarpawel.com</a> ·
  <a href="https://piwowarpawel.com/cv/">CV</a> ·
  <a href="https://itrolerank.com/">IT Role Rank</a> ·
  <a href="https://www.linkedin.com/in/pawelpiwowar88/">LinkedIn</a> ·
  <a href="https://www.credly.com/users/pawel-piwowar.56832a3a/badges/credly">Credly</a> ·
  <a href="https://learn.microsoft.com/en-us/users/pawepiwowar/transcript/vn6rwsyj1lqylkq">Microsoft Learn</a>
</p>

## Hi, I'm Paweł

It started with the Amiga. I'm self-taught. I went from building PCs to IT support, then worked as a
SysAdmin before moving into DevOps.

Today I work with Azure, IONOS Cloud and VMware. I build infrastructure, automate repeatable work
and make sure the logs help when something breaks. I'm learning more about platform engineering,
AI infrastructure and cloud architecture.

## What I work on

The professional projects below are anonymised.

- **[Grafana stack](https://piwowarpawel.com/projects/observability-platform/)**. I built and run
  the stack with my own collectors and 50 dashboards as code. VictoriaLogs stores millions of log
  lines a day. My Grafana plugin fork uses OpenRouter to help analyse the connected data sources.
- **[vCenter to Azure and IONOS Cloud](https://piwowarpawel.com/projects/hybrid-cloud-migration/)**.
  I co-led the migration. We scripted the VM moves and imported the cloud resources into Terraform.
- **[IONOS Cloud as code](https://piwowarpawel.com/projects/ionos-infrastructure-as-code/)**.
  We bring existing environments under Terraform and deploy new ones from code. Ansible handles
  VM configuration, patching and access.
- **[n8n platform](https://piwowarpawel.com/projects/infrastructure-automation/)**. I'm the global
  admin. I maintain the containers and plugins and monitor workflow runs across teams. I built
  multiple Ops workflows with AI support, including alert-to-ticket automation and recurring reports.

## Personal projects

| Project | What it is | Built with |
|---|---|---|
| [piwowarpawel.com](https://piwowarpawel.com/) | My EN/PL portfolio and technical notes, with [STAGE checks and production approval](https://piwowarpawel.com/projects/personal-website/) | Astro, TypeScript, Azure Pipelines, Cloudflare Workers |
| [IT Role Rank](https://itrolerank.com/) | 73 IT roles in Poland with adjustable weights. Job-ad data from SOLID.Jobs and BlueLionJob, salary context from No Fluff Jobs reports. [Methodology](https://itrolerank.com/methodology/) | Astro, TypeScript, Azure Pipelines, Cloudflare Workers |
| [HomeLab 3.0](#homelab-30) | Where I practise deploying, monitoring and rebuilding services, and test local LLMs | VMware Workstation Pro, Terraform, Ansible, Azure DevOps, Grafana |

## HomeLab 3.0

My old lab had around 30 Hyper-V VMs. I rebuilt it to practise the whole cycle. Deploy a service,
watch it, break it on purpose and recover it from code. Preferably without a notebook full of
mystery settings.

The rebuild runs on VMware Workstation Pro. Terraform and Ansible live in Git, and Azure DevOps
pipelines run on a self-hosted agent. Grafana monitors the lab VMs and the uptime of my sites.
Prometheus for metrics, VictoriaLogs for logs, Alloy for collection.

I'm testing local Qwen models for code completion in VS Code, infrastructure changes and analysis
in Grafana. I review the changes before they go through the pipeline. The lab is still under
construction. k3s and Argo CD are on the roadmap, along with a workflow using LangGraph, Qdrant
and Neo4j to give the models context and keep a review step before any change runs.

The [HomeLab page](https://piwowarpawel.com/homelab/) has the architecture. I wrote about
[why I started over](https://piwowarpawel.com/articles/homelab-3-rebuild/) and
[how I use local LLMs in the lab](https://piwowarpawel.com/articles/local-llms-and-homelab-as-code/).

## Where the code lives

I work in Azure Repos and use Azure Pipelines for validation and delivery. My personal projects
have private GitHub mirrors. A pipeline publishes this profile README to GitHub from Azure Repos.

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
