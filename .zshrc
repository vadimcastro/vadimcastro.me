# Project navigation shortcuts
  vc() {
      cd /root/vadimcastro.me
  }

  # Git shortcuts
  alias gs='git status'
  alias ga='git add .'
  alias gc='git commit -m'
  alias gp='git push'
  alias gl='git pull'
  alias gb='git branch'
  alias gco='git checkout'
  alias glog='git log --oneline -1'

  # System shortcuts
  alias ll='ls -alh'
  alias ..='cd ..'
  alias home='cd ~'
  alias c='clear'

  # Docker shortcuts
  alias dps='docker ps'
  alias dclean='docker system prune -f'
  alias dlog='docker logs -f'
  alias dex='docker exec -it'

  # Development shortcuts
  alias dev='make dev'
  alias prod='make prod'
  alias deploy='make deploy'
  alias status='make droplet-status'

  # Quick commit and push
  gcp() {
      git add . && git commit -m "$1" && git push
  }
